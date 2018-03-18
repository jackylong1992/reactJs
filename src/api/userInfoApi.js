
class UserInfo {
    constructor () {
        var defaultValue = '';
        this.myInfo = {};
        this.myInfo.id = defaultValue;
        this.myInfo.displayName = defaultValue;
        this.myInfo.onChannel = defaultValue;
        this.myInfo.clientId = defaultValue;
        this.myInfo.birthday = defaultValue;
        this.myInfo.gender = defaultValue;
        this.myInfo.loginStatus = defaultValue;
        this.myInfo.isFree = defaultValue;
    }

    updateMyInfo (newInfo) {
        // this.myInfo = Object.assign(this.myInfo, newInfo)
        //console.log(newInfo);
        if (newInfo.hasOwnProperty('birthday')) {
            this.myInfo.birthday = newInfo.birthday;
        }

        if (newInfo.hasOwnProperty('chatWith')) {
            this.myInfo.onChannel = newInfo.chatWith;
        }

        if (newInfo.hasOwnProperty('gender')) {
            this.myInfo.gender = newInfo.gender;
        }

        if (newInfo.hasOwnProperty('id')) {
            this.myInfo.id = newInfo.id;
        }

        if (newInfo.hasOwnProperty('isFree')) {
            this.myInfo.isFree = newInfo.isFree;
        }

        if (newInfo.hasOwnProperty('loginStatus')) {
            this.myInfo.loginStatus = newInfo.loginStatus;
        }

        if (newInfo.hasOwnProperty('name')) {
            this.myInfo.name = newInfo.name;
        }

        if (newInfo.hasOwnProperty('clientId')) {
            this.myInfo.clientId = newInfo.clientId;
        }
    }
}
var exp = new UserInfo();
export default exp;