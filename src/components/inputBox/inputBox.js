import React, {PropTypes} from 'react';
import './inputBox.scss';
// This is template for creating STATEFULL COMPONENT
class UserTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        // binding this here if necessary
        this.onClickHere = this.onClickHere.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {value:""};
    }
    onChange (param) {
        console.log(param.target.value);
        this.setState({value: param.target.value});
    }
    onClickHere () {
        this.props.onClick(this.state.value);
    }
    render() {
        console.log('rerender me');
        return (
            <div>
                <input value={this.state.value} onChange={this.onChange}></input>
                <button stype="submit" onClick={this.onClickHere} >Click me</button>
            </div>
        );
    }  
}
export default UserTab;