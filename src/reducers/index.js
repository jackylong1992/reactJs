import {combineReducers} from 'redux';
import userList from './userListReducer';
import chatBox from './chatBoxReducer';
import fakeData from './fakeDataReducer';

const rootReducer = combineReducers({
  userList,
  chatBox,
  fakeData
});

export default rootReducer;
