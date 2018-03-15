import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToChatBox = this.changeToChatBox.bind(this);
        }

        changeToChatBox () {
            browserHistory.push('/chatbox');
        }
  render() {
    // console.log(this.props);
    // TODO: create child component to display this
    return (
      <div>
        <h1>This page display user list</h1>
        {this.props.state.map(user =>
        <li key={user.uid}>{user.uid} - {user.displayName}</li>
      )}
        <button onClick={this.changeToChatBox}> click me to change state</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
      state: state.userList
    };
  }
  
export default connect(mapStateToProps)(UserList);