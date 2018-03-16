import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import UserList from './components/userlist/UserList';
import ChatBox from './components/chatbox/ChatBox';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import Login from './components/login/Login'
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="courses" component={CoursesPage} />
    <Route path="course" component={ManageCoursePage} />
    <Route path="course/:id" component={ManageCoursePage} />
    <Route path="about" component={AboutPage} />
    <Route path="userList" component={UserList} />
    <Route path="chatBox" component={ChatBox} />
  </Route>
);
