
import firebase from '../myfilebase'


  class UserList {
    static readData (link) {
        var promise = new Promise ( (resolve, reject) => {
            var starCountRef = firebase.database().ref(link);
            starCountRef.once('value', function(snapshot) {
                resolve(snapshot.val());
            });
            
        });
        return promise;
    }
    // TODO: implement unwatchData to avoid overwrite watch
    static watchData (link, cb) {
        var starCountRef = firebase.database().ref('/users/' + link);
        starCountRef.on('value', function(snapshot) {
            if (cb) {
                cb(snapshot.val());
            }
        });
        return starCountRef;
    }
  }
  

export default UserList;