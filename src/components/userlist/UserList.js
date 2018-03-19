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


    }

    componentWillMount() {
        this.props.actions.updateUserList();
        this.props.actions.watchUserList();

    }

    componentDidMount() {
    }

    componentWillReceiveProps(newProps) {
    }

    changeToChatBox (clientId, clientName) {
        userInfoApi.updateMyInfo({clientId: clientId, isActive : true, clientName:clientName});
        browserHistory.push({pathname : '/chatbox', state : this.props.state.chatBox});
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