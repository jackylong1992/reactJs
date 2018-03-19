
import firebase from '../myfilebase';
import referenceMappingApi from './referenceMappingApi';
import userInfoApi from './userInfoApi';

class ChatBox {
    constructor () {
        this.reference;
        this.watchId;
    }
    sendData (senderId, message) {
        var messageList = firebase.database().ref('/channel/'+ userInfoApi.myInfo.onChannel +'/messageList').push();
        messageList.set({
            from : senderId,
            text : message
        });
    }

    watchData (cb) {
        this.reference = firebase.database().ref('/channel/'+ userInfoApi.myInfo.onChannel +'/messageList');
        this.watchId = this.reference.on('value', function(snapshot) {
            if (cb) {
                cb(snapshot.val());
            }
        });
        return;
    }

    unWatchData () {
        
        if (this.reference) {
            this.reference.off('value', this.watchId);
            this.reference = undefined;
        }
        
    }
}
  
var exp = new ChatBox()
export default exp;