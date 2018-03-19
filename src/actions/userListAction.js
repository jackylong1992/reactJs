import mockUserList from '../api/mockUserList';
import * as types from './actionTypes';
import userListModel from '../model/userList';
import referenceMapping from '../api/referenceMappingApi';
import {browserHistory} from 'react-router';
import userInfoApi from '../api/userInfoApi';
import mockChatBox from '../api/mockChatBox';

var watchId;
function beginAjaxCall () {
    return {type: types.BEGIN_FIREBASE};
}

function loadUserList(userList) {
    return {type: types.UPDATE_USER_LIST, userList};
}

export function  updateUserList() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return mockUserList.readData('/users')
        .then(userList => {
            dispatch(loadUserList(userListModel.processData(userList)));
        })
        .catch(error => {
            throw(error);
        });
    };
}

export function  watchUserList( ) {
    return function(dispatch) {
        mockUserList.watchData ('', (userList) => {
            referenceMapping.mappingData(userList);
            dispatch(loadUserList(userListModel.processData(userList)));
            watchMyInfo();
        });
    };
}

function  watchMyInfo( ) {
        if (watchId) {
            return;
        }

        watchId = mockUserList.watchData (referenceMapping.getReferenceFromId(userInfoApi.myInfo.id), (myInfo) => {
            // TODO: implement action, change state in here, route still have warning here
            if (!myInfo) return;
            try {
                if (!myInfo.isFree && myInfo.clientId.toString().length) {
                    browserHistory.push('/chatBox');
                } else if (myInfo.isFree) {
                    browserHistory.push('/userList');
                    mockChatBox.unWatchData();
                }
            } catch (err) {
                console.error('issue in UserList Action ', err);
            }
        });
}

