import $ from 'jquery';
import firebase from '../myfilebase';
import referenceMapping from '../api/referenceMappingApi';
import userInfoApi from '../api/userInfoApi';

function readData (link) {
    var promise = new Promise((resolve) => {
        var starCountRef = firebase.database().ref(link);
        starCountRef.once('value', function(snapshot) {
            console.log("snapshot result success", snapshot.val());
            resolve(snapshot.val());
        });
    });

    return promise;
    
}

class ClientApi {
    constructor () {
        
    }
    /**
     * 
     * @param {*} client reference 
     * @return promise which resolve to true/false
     */
    static isClientAvailable (clientRef) {
        return readData('/users/' + clientRef).then(function(data) {
            if (data.loginStatus && data.isFree) {
                return true;
            } else {
                return false;
            }
        });
    }
    /**
     * 
     * @param {*} channelId
     * @return a promise which resolve to true/false 
     */
    static isChannelExist (channelId) {
        return readData('/channel').then(function(data) {
            for (var channel in data) {
                if(data[channel].between == channelId) {
                    //g_user.onChannel = channel;
                    return true;
                }
            }
            return false;
        });
    }

    /**
     * 
     * @param {*} channelId
     * @return channel reference 
     */
    static createChatChannel (channelId) {
        // console.log('create chat channel');
        var newChannel = firebase.database().ref('/channel').push();
        newChannel.set({
            between: channelId,
            messageList : "init"
        });
        return newChannel.key;
    }
    /**
     * 
     * @param {*} referenceId 
     * @param {*} isFree 
     * @param {*} chatWith 
     * @param {*} clientId
     * @return none 
     */
    static updateClientStatus(referenceId, isFree, chatWith, clientId) {
        var udpateValue = firebase.database().ref('users/' + referenceId);
        udpateValue.update({chatWith : chatWith || '', isFree : isFree, clientId : clientId });
        return;
    }

    static createChannelListId (userId, clientId) {
        var ret;
        if (userId < clientId) {
            ret = userId + clientId;
        } else {
            ret = clientId + userId;
        }
        // console.log('channel id = ', ret)
        return ret;
    }

    static acquireClient(clientId, watchChatBox) {
        var channelId = this.createChannelListId(clientId, userInfoApi.myInfo.id);
        this.isClientAvailable(referenceMapping.getReferenceFromId(clientId))
        .then((isAvailable)=> {
            if (!isAvailable) {
                return Promise.reject();
            }
        })
        .then(()=> {
            return this.isChannelExist(channelId);
        }, () => {
            console.log("client is busy");
        })
        .then ((isExist) => {
            var channelReference;
            if (isExist) {
                channelReference = isExist;
            } else {
                channelReference = this.createChatChannel(channelId);
            }
            // CHECK: you can call this one from upper layer to avoide calling to export method
            this.updateClientStatus(referenceMapping.getReferenceFromId(clientId), false, channelReference, userInfoApi.myInfo.id);
            watchChatBox(channelReference);
        });
    }
}

export default ClientApi;