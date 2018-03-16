import $ from 'jquery';
import firebase from '../myfilebase';

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
    static updateClienttatus(referenceId, isFree, chatWith, clientId) {
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
}

export default ClientApi;