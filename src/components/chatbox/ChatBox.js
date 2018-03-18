import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as ChatBoxAction from '../../actions/chatBoxAction';
import $ from 'jquery';
import userInfoApi from '../../api/userInfoApi';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToChatBox = this.changeToUserList.bind(this);
        
        this.sendMessage = this.sendMessage.bind(this);
        // console.log('update message', this.props);
        // this.props.actions.watchChatBox();
        // accquire client
        var clientId = userInfoApi.clientId;
        this.props.actions.acquireClient(clientId);
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
        // TODO: release client information in here
    }

    sendMessage () {
        console.log("sendMessage");
        var message = $('#messageSpace input').val();
        this.props.actions.sendChatBox("1111", message);
    }

    render() {
        return (
            <div id="messageSpace">
                <div id='chatContent'>
                {this.props.state.map((message, index) =>
                <li key={index}>{message.text}</li>
                )}
                </div>
                <input id='inputBox' type="text"/>
                <button onClick={this.sendMessage}>Send</button>
                <button onClick={this.changeToUserList}>Release client</button>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        state: state.chatBox
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(ChatBoxAction, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);