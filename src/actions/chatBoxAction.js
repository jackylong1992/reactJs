import mockChatBox from '../api/mockChatBox';
import * as types from './actionTypes';
import chatBoxModel from '../model/chatBoxModel';
import referenceMapping from '../api/referenceMappingApi';

function beginAjaxCall () {
    return {type: types.BEGIN_FIREBASE};
}
function loadChatBox(chatBox) {
    return {type: types.UPDATE_CHAT_BOX, chatBox};
  }

export function  watchChatBox() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        // return mockChatBox.watchData('/channel/' + referenceMapping.getReferenceFromId(g_user.clientId))
        return mockChatBox.watchData('/channel/' + referenceMapping.getReferenceFromId())
        .then(chatBox => {
            console.log("message list", chatBoxModel.processData(chatBox));
            dispatch(loadChatBox(chatBoxModel.processData(chatBox)));
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function  sendChatBox( senderId, message ) {
    return function(dispatch) {
        mockChatBox.sendData (senderId, message);
        // don't dispatch anythings
    };
}

