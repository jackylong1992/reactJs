
import firebase from '../myfilebase'


  class UserList {
    static readData (link) {
        var promise = new Promise ( (resolve, reject) => {
            var starCountRef = firebase.database().ref(link);
            starCountRef.once('value', function(snapshot) {
                //console.log("snapshot result success", snapshot.val());
                resolve(snapshot.val());
            });
            
        });
        return promise;
    }
    // TODO: implement unwatchData to avoid overwrite watch
    static watchData (link, cb) {
        var starCountRef = firebase.database().ref('/users/' + link);
        //console.log("watch data in", link);
        return starCountRef.on('value', function(snapshot) {
            // //console.log("data change",snapshot.val());
            if (cb) {
                cb(snapshot.val());
            }
        });
    }
  }
  

export default UserList;