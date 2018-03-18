import firebase from '../myfilebase';
const LOGIN = 1;
const LOGOUT = 0;
import userInfoApi from './userInfoApi';
import referenceMapping from './referenceMappingApi';
class LoginApi {
    // this function verify user is register or not. Return promise which resolve to true or false
    static  verifyUser(userId) {
        return new Promise((resolve, reject) => {
            var starCountRef = firebase.database().ref('/users');
            starCountRef.once('value', function(snapshot) {
                var userList = snapshot.val();
                referenceMapping.mappingData(userList);
                console.log("mapping data", userList);
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
        });
    }
}
export default LoginApi;