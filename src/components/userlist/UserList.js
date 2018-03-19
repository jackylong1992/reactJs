import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import * as usrListAction from '../../actions/userListAction';
import userInfoApi from '../../api/userInfoApi';
import UserCard from './UserCard';
class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        // this.changeToChatBox = this.changeToChatBox.bind(this);
        //console.log("this is usrList page first data = ", this.props);

    }

    componentWillMount() {
        // //console.log('Component WILL MOUNT!');
        // //console.log('update user list');
        this.props.actions.updateUserList();
        // NOTE: because so watchMyInfo cannot get data at first time because there is no user list yet
        this.props.actions.watchUserList();
        // userInfoApi is parse from login phrase
        // this.props.actions.watchMyInfo();
    }
    componentDidMount() {
        console.log('Component DID MOUNT!', userInfoApi.myInfo.name);

    }

    componentWillReceiveProps(newProps) {
        //console.log('userList receive new props', newProps);
    }

    changeToChatBox (clientId, clientName) {
        console.log("CHANGE TO CHAT BOX", clientId);
        userInfoApi.updateMyInfo({clientId: clientId, isActive : true, clientName:clientName});
        browserHistory.push({pathname : '/chatbox', state : this.props.state.chatBox});
        // //console.log("change link", this.props);
    }

    cannotClickMe() {
        console.log('I am busy, cannot chat to me');
    }

    render() {
        return (
            <div>
                <h1>Welcome {userInfoApi.myInfo.name}!</h1>
                {this.props.state.userList.map(user => {
                    if (user.id == userInfoApi.myInfo.id) return;
                    if (!user.isFree) {
                        return <UserCard key={user.id} name={user.name} isBusy={true} onClick={this.cannotClickMe}/>;
                    } else {
                        return <UserCard key={user.id} name={user.name} isBusy={false} onClick={this.changeToChatBox.bind(this, user.id, user.name)}/>;
                    }
                }
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