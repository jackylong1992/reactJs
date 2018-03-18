import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import loginApi from '../../api/loginApi';
import $ from 'jquery';
// import * as usrListAction from '../../actions/userListAction';

class AccountInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToNextState = this.changeToNextState.bind(this);
        this.changeState = this.changeState.bind(this);
        console.log("this is account info in page first data = ", this.props);
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
        browserHistory.push(state);
        //console.log("change link", this.props);
    }

    changeState () {
        var user = {};
        user.uid = this.props.location.state.id;
        user.displayName = $('#nickName').val();
        user.birthday = $('#birthDay').val();
        user.gender = $('#gender').val();
        loginApi.addUser(user);
        this.changeToNextState('/userList');
    }

    render() {
        return (
            <div>
                <h1>This page display user account info</h1>
                <label >User Nick Name</label>
                <input id="nickName" type="text"></input><br/>
                <label>Age</label>
                <input id="birthDay" type="number"></input><br/>
                <label>Gender</label>
                <input id="gender" type="text"></input><br/>
                <button onClick={this.changeState}>Submit</button>
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
    //   actions: bindActionCreators(usrListAction, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);