import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userListReducer(state = initialState.userList, action) {
  switch (action.type) {
    case types.UPDATE_USER_LIST:
      return action.userList;

    case types.BEGIN_FIREBASE:
      return state;

    default:
      return state;
  }
}
