import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as ChatBoxAction from '../../actions/chatBoxAction';
import $ from 'jquery';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToChatBox = this.changeToUserList.bind(this);
        
        this.sendMessage = this.sendMessage.bind(this);
        console.log('update message', this.props);
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
                <button>Release client</button>
                
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