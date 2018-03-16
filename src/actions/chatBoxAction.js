import mockChatBox from '../api/mockChatBox';
import * as types from './actionTypes';
import chatBoxModel from '../model/chatBoxModel';
import referenceMapping from '../api/referenceMappingApi';
import clientApi from '../api/clientApi';
import userInfoApi from '../api/userInfoApi'

function beginAjaxCall () {
    return {type: types.BEGIN_FIREBASE};
}
function loadChatBox(chatBox) {
    return {type: types.UPDATE_CHAT_BOX, chatBox};
  }

export function  watchChatBox(channelRef) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        // return mockChatBox.watchData('/channel/' + referenceMapping.getReferenceFromId(g_user.clientId))
        return mockChatBox.watchData( (chatBox) => {
            console.log("message list", chatBoxModel.processData(chatBox));
            dispatch(loadChatBox(chatBoxModel.processData(chatBox)));
        })
    };
}

export function  sendChatBox( senderId, message ) {
    return function(dispatch) {
        mockChatBox.sendData (senderId, message);
        // don't dispatch anythings
    };
}

export function  acquireClient(clientId) {
    var channelId = clientApi.createChannelListId(clientId, userInfoApi.myInfo.id);
    clientApi.isClientAvailable(referenceMapping.getReferenceFromId(clientId))
    .then((isAvailable)=> {
        if (!isAvailable) {
            return Promise.reject();
        }
    })
    .then(()=> {
        
        return clientApi.isChannelExist(channelId);
    }, () => {
        console.log("client is busy");
    })
    .then ((isExist) => {
        var channelReference;
        if (isExist) {
            channelReference = isExist;
        } else {
            channelReference = clientApi.createChatChannel(channelId);
        }
        // CHECK: you can call this one from upper layer to avoide calling to export method
        watchChatBox(channelReference);
    })
}