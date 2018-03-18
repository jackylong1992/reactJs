import React, {PropTypes} from 'react';

const UserTab = ({name, isBusy, onClick}) => {
    if (isBusy) {
        return (
            <div className={"panel panel-danger"} onClick={onClick}>
            <div className={"panel-heading"}>{name}</div>
            </div>
        );
    } else {
        return (
            <div className={"panel panel-info"} onClick={onClick}>
            <div className={"panel-heading"}>{name}</div>
            </div>
        );
    }
  
};

// UserTab.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default UserTab;