import firebase from '../myfilebase';
const LOGIN = true;
const LOGOUT = false;
import userInfoApi from './userInfoApi';
import referenceMapping from './referenceMappingApi';
class LoginApi {
    // this function verify user is register or not. Return promise which resolve to true or false
    static  verifyUser(userId) {
        return new Promise((resolve, reject) => {
            var starCountRef = firebase.database().ref('/users/');
            starCountRef.once('value', function(snapshot) {
                var userList = snapshot.val();
                console.log('MAPPING AT VERIFY USER', userList);
                referenceMapping.mappingData(userList);
                //console.log("mapping data", userList);
                //console.log("login API data = ", userList);
                for (var key in userList) {
                    if (userList[key].id == userId) {
                        userInfoApi.updateMyInfo(userList[key]);
                        resolve(true);
                    }
                }
                resolve(false);
            });
        });
        
    }

    static addUser (user) {
        var newPostKey = firebase.database().ref('/users').push();
        newPostKey.set({
            id: user.uid,
            name: user.displayName,
            loginStatus : LOGIN,
            isFree : true,
            chatWith : "",
            clientId: "",
            birthday: user.birthday,
            gender: user.gender
        })
        .then(()=>{
            userInfoApi.updateMyInfo({id:user.uid});
            var starCountRef = firebase.database().ref('/users/');
            starCountRef.once('value', function(snapshot) {
                var userList = snapshot.val();
                console.log('MAPPING AFTER ADD USER', userList);
                referenceMapping.mappingData(userList);
            });
        });
    }

    static loginByGoogle (user) {
        // console.log('start login by GG');
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider).catch(function(error) {
            ////console.log(error);
        }).then(function(result) {
            // console.log(result.user);
            // console.log('log in success');
            return(result.user.uid);

            // The signed-in user info.
            // var user = result.user;

            //readData();
            // 
            //console.log("log in ok");
            // //console.log(firebase.toString());
            // firebase.on('value',  (snapshot) => {
            //     //console.log("snapshot result = ", snapshot.val());
            //     console.error('fuck');
            //     // resolve(snapshot.val());
            // });
        });

        
    }
    
    static loginByFaceBook (user) {
        console.log('start login by FB');
        var provider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(provider).catch(function(error) {
            ////console.log(error);
        }).then(function(result) {
            // console.log(result.user);
            // console.log('log in success');
            return(result.user.uid);

            // The signed-in user info.
            // var user = result.user;

            //readData();
            // 
            //console.log("log in ok");
            // //console.log(firebase.toString());
            // firebase.on('value',  (snapshot) => {
            //     //console.log("snapshot result = ", snapshot.val());
            //     console.error('fuck');
            //     // resolve(snapshot.val());
            // });
        });
    }
}
export default LoginApi;