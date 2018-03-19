import $ from 'jquery';
import firebase from '../myfilebase';
import referenceMapping from '../api/referenceMappingApi';
import userInfoApi from '../api/userInfoApi';
import {browserHistory} from 'react-router';

function readData (link) {
    var promise = new Promise((resolve) => {
        var starCountRef = firebase.database().ref(link);
        starCountRef.once('value', function(snapshot) {
            //console.log("snapshot result success", snapshot.val());
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
            console.log('client availble', data.isFree);
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
            //console.log("searching for channel in ", data);
            for (var channel in data) {
                if(data[channel].between == channelId) {
                    //g_user.onChannel = channel;
                    //console.log("channel exist", channel);
                    return channel;
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
        console.log('create chat channel ', channelId);
        var newChannel = firebase.database().ref('/channel').push();
        newChannel.set({
            between: channelId,
            messageList : []
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
            ret = userId.toString() + clientId.toString();
        } else {
            ret = clientId.toString() + userId.toString();
        }
        // //console.log('channel id = ', ret)
        return ret;
    }

    static acquireClient(clientId) {
        var channelId = this.createChannelListId(clientId, userInfoApi.myInfo.id);
        //console.log("acquire client reference" , referenceMapping.getReferenceFromId(clientId));
        return this.isClientAvailable(referenceMapping.getReferenceFromId(clientId))
        .then((isAvailable)=> {
            if (!isAvailable) {
                console.log("promise reject")
                return Promise.reject();
            }
        })
        .then(()=> {
            
            return this.isChannelExist(channelId);
        }, () => {
            console.log("client is busy");
            userInfoApi.updateMyInfo({clientId:''});
            browserHistory.push('/userList');
        })
        .then ((isExist) => {
            var channelReference;
            if (isExist) {
                channelReference = isExist;
                console.log("channel exist");
            } else {
                channelReference = this.createChatChannel(channelId);
                console.log("create new channel");
            }
            // CHECK: you can call this one from upper layer to avoide calling to export method
            this.updateClientStatus(referenceMapping.getReferenceFromId(clientId), false, channelReference, userInfoApi.myInfo.id);
            this.updateClientStatus(referenceMapping.getReferenceFromId(userInfoApi.myInfo.id), false, channelReference, '');
            userInfoApi.updateMyInfo({chatWith: channelReference});
            
            // watchChatBox(channelReference);
        });
    }

    static releaseClient() {
        this.updateClientStatus(referenceMapping.getReferenceFromId(userInfoApi.myInfo.clientId), true, '', '');
        this.updateClientStatus(referenceMapping.getReferenceFromId(userInfoApi.myInfo.id), true,'' , '');
        userInfoApi.updateMyInfo({chatWith: '', isFree : true, clientId:''});
        browserHistory.push('/userList');
    }

    static setupWatchReference () {
        return readData('/users/' + referenceMapping.getReferenceFromId(userInfoApi.myInfo.id))
        .then((data)=>{
            userInfoApi.updateMyInfo({chatWith: data.chatWith, clientId: data.clientId, id:data.id});
            console.log('mapping channel', data.chatWith);
    });
    }
}

export default ClientApi;