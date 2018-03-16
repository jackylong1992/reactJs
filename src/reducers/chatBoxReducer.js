import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatBoxReducer(state = initialState.channel, action) {
  switch (action.type) {
    case types.UPDATE_CHAT_BOX:
      return action.chatBox;

    default:
      return state;
  }
}
