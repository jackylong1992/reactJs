import React from 'react';
import {connect} from 'react-redux';

class UserList extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>This page display user list</h1>
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