import mockUserList from '../api/mockUserList';
import * as types from './actionTypes';
import userListModel from '../model/userList';
import referenceMapping from '../api/referenceMappingApi';
import {browserHistory} from 'react-router';
import userInfoApi from '../api/userInfoApi';

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
                // TODO: change will be propangate many times, need to filter by compare current value and previos value.
                //console.log('userlist change');
                watchMyInfo();
                if (Object.keys(userList).length == referenceMapping.getMappingData().length) {
                    //console.log('equal ', referenceMapping.getMappingData().length)
                    dispatch(loadUserList(userListModel.processData(userList)));
                    return;
                }
                
                referenceMapping.mappingData(userList);
                dispatch(loadUserList(userListModel.processData(userList)));

            });
        };
    }

    function  watchMyInfo( ) {
            if (watchId) {
                console.log("STEP 1: already watching channel");
                return;
            }
            console.log(userInfoApi);
            console.log('STEP 1: is watching my  User channel on ', referenceMapping.getReferenceFromId(userInfoApi.myInfo.id));
            watchId = mockUserList.watchData (referenceMapping.getReferenceFromId(userInfoApi.myInfo.id), (myInfo) => {
                //console.log("my info change", myInfo);
                // dispatch(loadUserList(userListModel.processData(userList)));
                // TODO: implement action, change state in here, route still have warning here
                // QUESTION: how the state is reander in this case
                // need to verify my info change
                // browserHistory.push('/userList');
                console.log("STEP 1: my info change", myInfo);
                if (!myInfo) return;
                try {
                    if (!myInfo.isFree && myInfo.clientId.toString().length) {
                        //console.log('go to chat page');
                        browserHistory.push('/chatBox');
                    } else if (myInfo.isFree) {
                        //console.log('go to user page');
                        browserHistory.push('/userList');
                    }
                } catch (err) {
                    console.error('issue in UserList Action ', err);
                }
                
            });
    }

