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
    console.log(this.props); // right know we have userlist on this.props
    return (
      <div>
        <h1>This page display user list</h1>
        {this.props.state.courses.map(user =>
        <li key={user.id}>{user.id} - {user.firstName}</li>
      )}
        <button onClick={this.changeToChatBox}> click me to change state</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
      state: state
    };
  }
  
export default connect(mapStateToProps)(UserList);