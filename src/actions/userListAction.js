import mockUserList from '../api/mockUserList';
import * as types from './actionTypes';
import userListModel from '../model/userList';
import referenceMapping from '../api/referenceMappingApi';
import {browserHistory} from 'react-router';
import userInfoApi from '../api/userInfoApi';

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
                //console.log("userList", userListModel.processData(userList));
                // TODO: display user information here
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
                //console.log("data change", userList);
                referenceMapping.mappingData(userList);
                dispatch(loadUserList(userListModel.processData(userList)));
            });
        };
    }

    export function  watchMyInfo( ) {
        return function(dispatch) {
            console.log(userInfoApi);
            mockUserList.watchData (referenceMapping.getReferenceFromId(userInfoApi.myInfo.id), (myInfo) => {
                //console.log("my info change", myInfo);
                // dispatch(loadUserList(userListModel.processData(userList)));
                // TODO: implement action, change state in here, route still have warning here
                // QUESTION: how the state is reander in this case
                // need to verify my info change
                // browserHistory.push('/userList');
                console.log("my info change");
            });
        };
    }

