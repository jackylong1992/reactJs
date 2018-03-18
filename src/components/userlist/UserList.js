import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as usrListAction from '../../actions/userListAction';
import userInfoApi from '../../api/userInfoApi';
class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.changeToChatBox = this.changeToChatBox.bind(this);
        //console.log("this is usrList page first data = ", this.props);
        // //console.log('update user list');
        this.props.actions.updateUserList();
        // //console.log('watch user list');
        this.props.actions.watchUserList();
        
        this.props.actions.watchMyInfo();
    }

    componentWillMount() {
        // //console.log('Component WILL MOUNT!');
    }
    componentDidMount() {
        // //console.log('Component DID MOUNT!');
    }

    componentWillReceiveProps(newProps) {
        //console.log('userList receive new props', newProps);
    }

    changeToChatBox (clientId) {
        userInfoApi.updateMyInfo({clientId: clientId});
        browserHistory.push({pathname : '/chatbox', state : this.props.state.chatBox});
        // //console.log("change link", this.props);
    }

    render() {
        return (
            <div>
                <h1>This page display user list</h1>
                {this.props.state.userList.map(user =>
                <li key={user.id} id={user.id} onClick={this.changeToChatBox.bind(this, user.id)}>{user.id} - {user.name}</li>
                )}
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
      actions: bindActionCreators(usrListAction, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserList);