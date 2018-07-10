import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
// import UserList from './components/userlist/UserList';
// import ChatBox from './components/chatbox/ChatBox';
import Login from './components/login/Login';
// import accountInfo from './components/accountinfo/accountInfo';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="login" component={Login} />
  </Route>
);
