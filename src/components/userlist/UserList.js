import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as usrListAction from '../../actions/userListAction';

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToChatBox = this.changeToChatBox.bind(this);
        // console.log('update user list');
        this.props.actions.updateUserList();
        // console.log('watch user list');
        this.props.actions.watchUserList();
    }

    componentWillMount() {
        // console.log('Component WILL MOUNT!');
    }
    componentDidMount() {
        // console.log('Component DID MOUNT!');
    }

    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!', newProps);
    }

    changeToChatBox () {
        browserHistory.push('/chatbox');
    }

    render() {
        return (
            <div>
                <h1>This page display user list</h1>
                {this.props.state.map(user =>
                <li key={user.id} onClick={this.changeToChatBox}>{user.id} - {user.name}</li>
                )}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state: state.userList
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(usrListAction, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserList);