import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatBoxReducer(state = initialState.fakeData, action) {
  switch (action.type) {
    case types.GET_FAKE_DATA:
      return action.fakeData;

    default:
      return state;
  }
}
