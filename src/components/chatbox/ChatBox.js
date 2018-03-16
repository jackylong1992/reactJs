import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as ChatBoxAction from '../../actions/chatBoxAction';

class ChatBox extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToChatBox = this.changeToUserList.bind(this);
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

    render() {
        return (
            <div id="messageSpace">
                <div id='chatContent'>
                {this.props.state.map((message, index) =>
                <li key={index}>{message.text}</li>
                )}
                </div>
                <input id='inputBox' type="text"/>
                <button onclick=''>Send</button>
                <button onclick=''>Release client</button>
                
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