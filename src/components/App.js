// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usrListAction from '../actions/userListAction';
import UserCard from './inputBox/inputBox';
import * as FakeDataAction from '../actions/fakeDataAction';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log("bring up App component");
        this.cannotClickMe = this.cannotClickMe.bind(this);
    }
  cannotClickMe(param) {
    console.log("click me", param);
    this.props.actions.getFakeData();
  }
  render() {
    console.log("component render", this.props.state) 
    return (
      <div className="container-fluid main-container">
        
          <UserCard isBusy={true} onClick={this.cannotClickMe}/>
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired,
//   loading: PropTypes.bool.isRequired
// };

function mapStateToProps(state, ownProps) {
  return {
        state: state.fakeData
    };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(FakeDataAction, dispatch) 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);