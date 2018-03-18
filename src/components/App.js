// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as usrListAction from '../actions/userListAction';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        

    }

  render() {
      
    return (
      <div className="container-fluid main-container">
        
        {this.props.children}
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
    // loading: state.ajaxCallsInProgress > 0
        
  };
}

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(usrListAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// TODO: how this.props.children can contain sub element of home page?