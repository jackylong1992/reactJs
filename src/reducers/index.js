import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import userList from './userListReducer';
import chatBox from './chatBoxReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  userList,
  chatBox
});

export default rootReducer;
