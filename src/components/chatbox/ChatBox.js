import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as ChatBoxAction from '../../actions/chatBoxAction';
import $ from 'jquery';
import userInfoApi from '../../api/userInfoApi';
import ChatBar from './ChatBar';
import ChatMessage from './ChatMessage';
import InputBar from './InputBar';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToUserList = this.changeToUserList.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillMount() {
        if (userInfoApi.myInfo.isActive) {
            var clientId = userInfoApi.myInfo.clientId;
            this.props.actions.acquireClient(clientId);
        } else {
            this.props.actions.watchMyChannel()
        }
        
    }
    componentDidMount() {
        $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    }

    componentWillReceiveProps(newProps) {
    }

    componentDidUpdate(prevProps, prevState) {
        $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    }
    changeToUserList () {
        this.props.actions.releaseClient();
    }

    sendMessage () {
        var message = $('#messageSpace input').val();
        this.props.actions.sendChatBox(message);
        $('#messageSpace input').val(""); // this is wrong, you should take message value from message component itself, current way is not good because parent is depended on children
        $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    }

    render() {
        return (
            <div id="messageSpace">
                {<ChatBar name={userInfoApi.myInfo.clientName} onClick={this.changeToUserList.bind(this)}/>}
                <div id='chatContent'>
                {this.props.state.map((message, index) =>
                <ChatMessage key={index} name={message.text} isSent={message.from == userInfoApi.myInfo.id}/>
                )}
                </div>
                <InputBar onClick={this.sendMessage}/>
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