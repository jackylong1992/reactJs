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
        this.onlineAccountLoginWithGoogle = this.onlineAccountLoginWithGoogle.bind(this);
        this.onlineAccountLoginWithFacebook = this.onlineAccountLoginWithFacebook.bind(this);
        //console.log("this is log in page first data = ", this.props);
    }

    componentWillMount() {
        // //console.log('Component WILL MOUNT!');
    }
    componentDidMount() {
        // //console.log('Component DID MOUNT!');
    }

    componentWillReceiveProps(newProps) {
        // //console.log('Component WILL RECIEVE PROPS!', newProps);
    }

    changeToNextState (userId) {
        // browserHistory.push({pathname : state, state: {userId : $('#userId').val()}});
        ////console.log("change link", this.props);
        // var userId = $('#userId').val();
        loginApi.verifyUser(userId)
        .then((isExist)=> {
            if (isExist) {
                browserHistory.push('/userList');
            } else {
                browserHistory.push({pathname:'/accountInfo', state: {id: userId}});
            }
        });
    }

    onlineAccountLoginWithGoogle () {
        loginApi.loginByGoogle()
        .then((userId)=>{
            this.changeToNextState(userId);
        });
    }

    onlineAccountLoginWithFacebook () {
        // loginApi.loginByGoogle()
        // .then((userId)=>{
            this.changeToNextState('1111');
        // });
    }

    render() {
        return (
            <div>
                <h1 id="loginQuote">Please choose how to LOGIN</h1>
                <div id="loginBtn">
                <button onClick={this.onlineAccountLoginWithGoogle} className="btn-primary btn-lg">Login by Google Account</button>
                <button onClick={this.onlineAccountLoginWithFacebook} className="btn-info btn-lg">Login by Facebook Account</button>
                </div>
                <br/>
                <br/>
                <label>User Id (this is for test purpose): </label> <input id="userId" type="text"></input>
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