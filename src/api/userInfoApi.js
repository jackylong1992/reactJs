class UserInfo {
    constructor () {
        var defaultValue = '';
        this.myInfo = {};
        this.myInfo.id = defaultValue;
        this.myInfo.displayName = defaultValue;
        this.myInfo.onChannel = defaultValue;
        this.myInfo.clientId = defaultValue;
    }

    static updateMyInfo (newInfo) {
        this.myInfo = Object.assign(this.myInfo, newInfo)
    }
}

export default UserInfo;