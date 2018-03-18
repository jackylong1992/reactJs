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
        // //console.log('update message', this.props);
        // this.props.actions.watchChatBox();
        // accquire client
        
    }

    componentWillMount() {
        // //console.log('Component WILL MOUNT!');
        if (userInfoApi.myInfo.isActive) {
            console.log("active user");
            var clientId = userInfoApi.myInfo.clientId;
            this.props.actions.acquireClient(clientId);
        } else {
            console.log("passive user");
            this.props.actions.watchMyChannel()
        }
        
    }
    componentDidMount() {
        // //console.log('Component DID MOUNT!');
        $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    }

    componentWillReceiveProps(newProps) {
        //console.log('Component WILL RECIEVE PROPS!', newProps);
    }

    componentDidUpdate(prevProps, prevState) {
        $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    }
    changeToUserList () {
        console.log("release client");
        this.props.actions.releaseClient();
        // TODO: release client information in here
    }

    sendMessage () {
        console.log("sendMessage");
        var message = $('#messageSpace input').val();
        this.props.actions.sendChatBox(message);
        $('#messageSpace input').val("");
        $("#chatContent").scrollTop($("#chatContent")[0].scrollHeight);
    }

    render() {
        return (
            <div id="messageSpace">
                {<ChatBar name={"Person you chat with"} onClick={this.changeToUserList.bind(this)}/>}
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