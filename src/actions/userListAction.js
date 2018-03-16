import mockUserList from '../api/mockUserList';
import * as types from './actionTypes';
import userListModel from '../model/userList'

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
                console.log("userList", userListModel.processData(userList));
                dispatch(loadUserList(userListModel.processData(userList)));
            })
            .catch(error => {
                throw(error);
            });
        };
    }
    
    export function  watchUserList( ) {
        return function(dispatch) {
            mockUserList.watchData ('/users', (userList) => {
                console.log("data change");
                dispatch(loadUserList(userListModel.processData(userList)));
            });
        };
    }

