import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as ChatBoxAction from '../../actions/chatBoxAction';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToChatBox = this.changeToUserList.bind(this);
        console.log('update message');
        this.props.actions.watchChatBox();
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

    changeToUserList () {
        browserHistory.push('/userList');
    }

    render() {
        return (
            <div>
                <h1>This page display chat box</h1>

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
      actions: bindActionCreators(ChatBoxAction, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);