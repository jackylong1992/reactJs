import {combineReducers} from 'redux';
import userList from './userListReducer';
import chatBox from './chatBoxReducer';

const rootReducer = combineReducers({
  userList,
  chatBox
});

export default rootReducer;
