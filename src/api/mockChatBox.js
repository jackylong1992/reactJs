
import firebase from '../myfilebase';


class ChatBox {
    static sendData (senderId, message) {
        // var messageList = firebase.database().ref('/channel/' +g_user.onChannel + '/messageList').push();
        var messageList = firebase.database().ref('/channel/-L7XCshe2qzEsYGrgBbf/messageList').push();
        messageList.set({
            from : senderId,
            text : message
        });
    }

    static watchData (cb) {
        var starCountRef = firebase.database().ref('/channel/-L7XCshe2qzEsYGrgBbf/messageList');
        starCountRef.on('value', function(snapshot) {
            console.log("chat box data", snapshot.val());
            if (cb) {
                cb(snapshot.val());
            }
        });
        return;
    }
}
  

export default ChatBox;