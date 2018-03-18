
import firebase from '../myfilebase';
import referenceMappingApi from './referenceMappingApi';
import userInfoApi from './userInfoApi'
class ChatBox {
    constructor () {

    }
    static sendData (senderId, message) {
        // var messageList = firebase.database().ref('/channel/' +g_user.onChannel + '/messageList').push();
        var messageList = firebase.database().ref('/channel/'+ userInfoApi.myInfo.onChannel +'/messageList').push();
        messageList.set({
            from : senderId,
            text : message
        });
    }

    static watchData (cb) {
        this.reference = firebase.database().ref('/channel/'+ userInfoApi.myInfo.onChannel +'/messageList');
        //console.log("is watching on ", userInfoApi.myInfo.onChannel);
        this.watchId = this.reference.on('value', function(snapshot) {
            //console.log("new message", snapshot.val());
            if (cb) {
                cb(snapshot.val());
            }
        });
        return;
    }

    static unWatchData () {
        this.reference.off('value', this.watchId);
    }
}
  

export default ChatBox;