import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import loginApi from '../../api/loginApi';
import $ from 'jquery';
import userInfoApi from './../../api/userInfoApi';
// import * as usrListAction from '../../actions/userListAction';

class AccountInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToNextState = this.changeToNextState.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    changeToNextState (state) {
        browserHistory.push(state);
    }

    changeState () {
        var user = {};
        user.uid = this.props.location.state.id;
        user.displayName = $('#nickName').val();
        user.birthday = $('#age').val();
        user.gender = $('#gender').val();
        userInfoApi.updateMyInfo({id: user.uid, name: user.displayName, birthday:user.birthday, gender: user.gender});
        loginApi.addUser(user);

        this.changeToNextState('/userList');
    }

    render() {
        return (
            <div id="accountInfo">
                <h1>Please give me more information</h1>
                <label for="inputlg">Nick Name</label>
                <input className="form-control input-lg" id="nickName" type="text"/>
                <label for="inputlg">Age</label>
                <input className="form-control input-lg" id="age" type="number"/>
                <label for="inputlg">Gender</label>
                <input className="form-control input-lg" id="gender" type="text"/>
                
                <button className="btn-primary btn-lg" onClick={this.changeState}>Submit</button>
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