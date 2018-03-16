import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
// import * as usrListAction from '../../actions/userListAction';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeToUserList = this.changeToUserList.bind(this);

    }

    componentWillMount() {
        // console.log('Component WILL MOUNT!');
    }
    componentDidMount() {
        // console.log('Component DID MOUNT!');
    }

    componentWillReceiveProps(newProps) {
        // console.log('Component WILL RECIEVE PROPS!', newProps);
    }

    changeToUserList () {
        browserHistory.push('/userList');
        console.log("change link", this.props);
    }

    render() {
        return (
            <div>
                <h1>This page display user LOGIN</h1>
                <button onClick={this.changeToUserList}>Login</button>
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
    //   actions: bindActionCreators(usrListAction, dispatch)
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);