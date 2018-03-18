
import firebase from '../myfilebase'
// var provider = new firebase.auth.GoogleAuthProvider();
// firebase.auth().signInWithPopup(provider).catch(function(error) {
//     ////console.log(error);
// }).then(function(result) {
//     //console.log(result);

//     // The signed-in user info.
//     // var user = result.user;

//     //readData();
//     // 
//     //console.log("log in ok");
//     // //console.log(firebase.toString());
//     // firebase.on('value',  (snapshot) => {
//     //     //console.log("snapshot result = ", snapshot.val());
//     //     console.error('fuck');
//     //     // resolve(snapshot.val());
//     // });
// });

  class UserList {
    static readData (link) {
        var promise = new Promise ( (resolve, reject) => {
            firebase.auth()
            .signInAnonymously()
            .then(() => {
                var starCountRef = firebase.database().ref(link);
                starCountRef.once('value', function(snapshot) {
                    //console.log("snapshot result success", snapshot.val());
                    resolve(snapshot.val());
                });
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