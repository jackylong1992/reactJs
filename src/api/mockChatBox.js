
import firebase from '../myfilebase';


class ChatBox {
    constructor () {

    }
    static sendData (senderId, message) {
        // var messageList = firebase.database().ref('/channel/' +g_user.onChannel + '/messageList').push();
        var messageList = firebase.database().ref('/channel/-L7XCshe2qzEsYGrgBbf/messageList').push();
        messageList.set({
            from : senderId,
            text : message
        });
    }

    static watchData (cb) {
        this.reference = firebase.database().ref('/channel/-L7XCshe2qzEsYGrgBbf/messageList');
        this.watchId = this.reference.on('value', function(snapshot) {
            //console.log("chat box data", snapshot.val());
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