import React, {PropTypes} from 'react';

const InputBar = ({onClick}) => {
    return (
        <div id="inputBar">
        <label for="inputlg"></label>
        <input className="form-control input-lg" id="inputBox" type="text"/>
        <button className="btn-primary btn-lg" onClick={onClick}>Send</button>
        </div>
    );
  
};

// InputBar.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default InputBar;