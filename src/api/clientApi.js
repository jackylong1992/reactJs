import $ from 'jquery';
import firebase from '../myfilebase';
import referenceMapping from '../api/referenceMappingApi';
import userInfoApi from '../api/userInfoApi';
import {browserHistory} from 'react-router';
import mockChatBox from './mockChatBox';

function readData (link) {
    var promise = new Promise((resolve) => {
        var starCountRef = firebase.database().ref(link);
        starCountRef.once('value', function(snapshot) {
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
    static updateClientStatus(referenceId, isFree, chatWith, clientId, clientName) {
        var udpateValue = firebase.database().ref('users/' + referenceId);
        udpateValue.update({chatWith : chatWith || '', isFree : isFree, clientId : clientId, clientName });
        return;
    }

    static createChannelListId (userId, clientId) {
        var ret;
        if (userId.toString() < clientId.toString()) {
            ret = userId.toString() + clientId.toString();
        } else {
            ret = clientId.toString() + userId.toString();
        }
        return ret;
    }

    static acquireClient(clientId) {
        var channelId = this.createChannelListId(clientId, userInfoApi.myInfo.id);
        return this.isClientAvailable(referenceMapping.getReferenceFromId(clientId))
        .then((isAvailable)=> {
            if (!isAvailable) {
                return Promise.reject();
            }
        })
        .then(()=> {
            
            return this.isChannelExist(channelId);
        }, () => {
            userInfoApi.updateMyInfo({clientId:''});
            browserHistory.push('/userList');
        })
        .then ((isExist) => {
            var channelReference;
            if (isExist) {
                channelReference = isExist;
            } else {
                channelReference = this.createChatChannel(channelId);
            }
            // CHECK: you can call this one from upper layer to avoide calling to export method
            this.updateClientStatus(referenceMapping.getReferenceFromId(clientId), false, channelReference, userInfoApi.myInfo.id, userInfoApi.myInfo.name);
            this.updateClientStatus(referenceMapping.getReferenceFromId(userInfoApi.myInfo.id), false, channelReference, '', '');
            userInfoApi.updateMyInfo({chatWith: channelReference});
        });
    }

    static releaseClient() {
        this.updateClientStatus(referenceMapping.getReferenceFromId(userInfoApi.myInfo.clientId), true, '', '', '');
        this.updateClientStatus(referenceMapping.getReferenceFromId(userInfoApi.myInfo.id), true,'' , '', '');
        userInfoApi.updateMyInfo({chatWith: '', isFree : true, clientId:''});
        mockChatBox.unWatchData();
        browserHistory.push('/userList');
    }

    static setupWatchReference () {
        return readData('/users/' + referenceMapping.getReferenceFromId(userInfoApi.myInfo.id))
        .then((data)=>{
            userInfoApi.updateMyInfo({chatWith: data.chatWith, clientId: data.clientId, id:data.id, clientName:data.clientName});
        });
    }
}

export default ClientApi;