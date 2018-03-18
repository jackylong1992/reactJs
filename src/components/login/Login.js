import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
import loginApi from '../../api/loginApi';
// import * as usrListAction from '../../actions/userListAction';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToNextState = this.changeToNextState.bind(this);
        this.onlineAccountLogin = this.onlineAccountLogin.bind(this);
        console.log("this is log in page first data = ", this.props);
    }

    componentWillMount() {
        // console.log('Component WILL MOUNT!');
    }
    componentDidMount() {
        // console.log('Component DID MOUNT!');
    }

    componentWillReceiveProps(newProps) {
        // console.log('Component WILL RECIEVE PROPS!', newProps);
    }

    changeToNextState (state) {
        // browserHistory.push({pathname : state, state: {userId : $('#userId').val()}});
        //console.log("change link", this.props);
        var userId = $('#userId').val();
        loginApi.verifyUser(userId)
        .then((isExist)=> {
            if (isExist) {
                browserHistory.push('/userList');
            } else {
                browserHistory.push({pathname:'/accountInfo', state: {id: userId}});
            }
        })
    }

    onlineAccountLogin () {
        var isFirstLogin = true;
        // authentication process in here, should return promise
        // check user exist in system
        // (if new user -> require extra information) change to User info page or change to User List page
        if (isFirstLogin) {
            this.changeToNextState('/accountInfo');
        } else {
            this.changeToNextState('/userList');
        }
    }

    render() {
        return (
            <div>
                <h1>This page display user LOGIN</h1>
                <button onClick={this.onlineAccountLogin}>Login by Google Account</button>
                <button onClick={this.onlineAccountLogin}>Login by Facebook Account</button>
                <label>User Id : </label> <input id="userId" type="text"></input>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
    //   actions: bindActionCreators(loginAction, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);