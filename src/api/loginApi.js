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
                referenceMapping.mappingData(userList);
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
            clientName : "",
            birthday: user.birthday,
            gender: user.gender
        })
        .then(()=>{
            userInfoApi.updateMyInfo({id:user.uid});
            var starCountRef = firebase.database().ref('/users/');
            starCountRef.once('value', function(snapshot) {
                var userList = snapshot.val();
                referenceMapping.mappingData(userList);
            });
        });
    }

    static loginByGoogle (user) {
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider).catch(function(error) {
        }).then(function(result) {
            return(result.user.uid);
        });

        
    }
    
    static loginByFaceBook (user) {
        var provider = new firebase.auth.FacebookAuthProvider();
        return firebase.auth().signInWithPopup(provider).catch(function(error) {
        }).then(function(result) {
            return(result.user.uid);
        });
    }
}
export default LoginApi;