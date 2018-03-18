import React, {PropTypes} from 'react';

const ChatMessage = ({name, isSent}) => {
    if (isSent) {
        return (
            <div className={"panel panel-danger isSent"}>
            <div className={"panel-heading"}>{name}</div>
            </div>
        );
    } else {
        return (
            <div className={"panel panel-info isReceive"}>
            <div className={"panel-heading"}>{name}</div>
            </div>
        );
    }
  
};

// ChatMessage.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default ChatMessage;