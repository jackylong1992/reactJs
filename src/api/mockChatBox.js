
import firebase from '../myfilebase';
import referenceMappingApi from './referenceMappingApi';
import userInfoApi from './userInfoApi'
class ChatBox {
    constructor () {
        this.reference;
        this.watchId;
    }
     sendData (senderId, message) {
        // var messageList = firebase.database().ref('/channel/' +g_user.onChannel + '/messageList').push();
        var messageList = firebase.database().ref('/channel/'+ userInfoApi.myInfo.onChannel +'/messageList').push();
        messageList.set({
            from : senderId,
            text : message
        });
    }

     watchData (cb) {
        this.reference = firebase.database().ref('/channel/'+ userInfoApi.myInfo.onChannel +'/messageList');
        console.log("STEP 2: is watching on message channel ", userInfoApi.myInfo.onChannel);
        this.watchId = this.reference.on('value', function(snapshot) {
            //console.log("new message", snapshot.val());
            if (cb) {
                cb(snapshot.val());
            }
        });
        return;
    }

     unWatchData () {
        console.log("UNWATCH DATA")
        if (this.reference) {
            this.reference.off('value', this.watchId);
        }
        
    }
}
  
var exp = new ChatBox()
export default exp;