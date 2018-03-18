import mockChatBox from '../api/mockChatBox';
import * as types from './actionTypes';
import chatBoxModel from '../model/chatBoxModel';
import referenceMapping from '../api/referenceMappingApi';
import clientApi from '../api/clientApi';
import userInfoApi from '../api/userInfoApi';

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
        });
    };
}

export function  sendChatBox( senderId, message ) {
    return function(dispatch) {
        mockChatBox.sendData (senderId, message);
        // don't dispatch anythings
    };
}

// use this style to overcome the action must be plain object.
export function  acquireClient(clientId) {
    return function() {
        clientApi.acquireClient(clientId, watchChatBox);
    }; 
}