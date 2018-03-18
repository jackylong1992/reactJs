import React, {PropTypes} from 'react';

const ChatBar = ({name, onClick}) => {
        return (
            <div className={"chatBar"}> 
            <span className="glyphicon glyphicon-chevron-left" onClick={onClick}></span>
            <span >Go back</span>
            <div><div className="chatWith">{name}</div></div>
            </div>
        );
};

// ChatBar.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default ChatBar;