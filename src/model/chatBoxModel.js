class ChatBoxModel {
    static processData (data) {
        var retArr = [];
        for (var key in data) {
            retArr.push(data[key]);
        }
        return retArr;
    }
}

export default ChatBoxModel;