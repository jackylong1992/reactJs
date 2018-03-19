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

export function  sendChatBox(message ) {
    return function(dispatch) {
        mockChatBox.sendData (userInfoApi.myInfo.id, message);
        // don't dispatch anythings
    };
}

// use this style to overcome the action must be plain object.
export function  acquireClient(clientId) {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        clientApi.acquireClient(clientId)
        .then(()=> {
            return mockChatBox.watchData( (chatBox) => {
                dispatch(loadChatBox(chatBoxModel.processData(chatBox)));
            });
        });
    }; 
}

export function  releaseClient() {
    return function() {
        clientApi.releaseClient();
    }; 
}

export function watchMyChannel() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        clientApi.setupWatchReference().then(()=> {
            mockChatBox.watchData( (chatBox) => {
                dispatch(loadChatBox(chatBoxModel.processData(chatBox)));
            });
        });
        
    };
}