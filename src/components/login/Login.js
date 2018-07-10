import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import $ from 'jquery';
// import loginApi from '../../api/loginApi';
import UserCard from '../inputBox/inputBox';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.changeToNextState = this.changeToNextState.bind(this);
        // this.onlineAccountLoginWithGoogle = this.onlineAccountLoginWithGoogle.bind(this);
        // this.onlineAccountLoginWithFacebook = this.onlineAccountLoginWithFacebook.bind(this);
        // this.onlineAccountLoginAsDefaultLongNguyen = this.onlineAccountLoginAsDefaultLongNguyen.bind(this);
        // this.onlineAccountLoginAsDefaultGotit = this.onlineAccountLoginAsDefaultGotit.bind(this);
        console.log('jump to login');
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    // changeToNextState (userId) {
    //     loginApi.verifyUser(userId)
    //     .then((isExist)=> {
    //         if (isExist) {
    //             browserHistory.push('/userList');
    //         } else {
    //             browserHistory.push({pathname:'/accountInfo', state: {id: userId}});
    //         }
    //     });
    // }

    // onlineAccountLoginWithGoogle () {
    //     loginApi.loginByGoogle()
    //     .then((userId)=>{
    //         this.changeToNextState(userId);
    //     });
    // }

    // onlineAccountLoginWithFacebook () {
    //     loginApi.loginByFaceBook()
    //     .then((userId)=>{
    //         this.changeToNextState(userId);
    //     });
    // }

    // onlineAccountLoginAsDefaultLongNguyen() {
    //     this.changeToNextState('1111');
    // }

    // onlineAccountLoginAsDefaultGotit() {
    //     this.changeToNextState('2222');
    // }
    // cannotClickMe(param) {
    //     console.log("click me", param);
    // }

    render() {
        return (
            <div>
                <h1 id="loginQuote">Please choose how to LOGIN</h1>
                {/*<UserCard isBusy={true} onClick={this.cannotClickMe}/>*/}
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