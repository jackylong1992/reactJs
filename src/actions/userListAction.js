import mockUserList from '../api/mockUserList';
import * as types from './actionTypes';


export function updateUserList() {
    return {type: types.UPDATE_USER_LIST, payload: mockUserList};
  }