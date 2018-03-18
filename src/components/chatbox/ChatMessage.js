import React, {PropTypes} from 'react';
import renderHTML from 'react-render-html';
function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?'+ // port
    '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
    '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

// this function return string with hightlight URL
function highlightURL(str) {
    var tempArr = str.split(" ");
    var retString = '';
    return tempArr.reduce(function(acc, value) {
		var temp;
        if (isURL(value)) {
            temp =acc + ' \<span class="isLink"\>' + value + '\<\/span\> ';
        } else {
            temp= acc + ' ' + value + ' ';
        }
		return temp;
    }, '');
}
const ChatMessage = ({name, isSent}) => {
    console.log(name);
    var text = highlightURL(name);
    if (isSent) {
        return (
            <div className={"panel panel-danger isSent"}>
            <div className={"panel-heading"}>{renderHTML(text)}</div>
            </div>
        );
    } else {
        return (
            <div className={"panel panel-info isReceive"}>
            <div className={"panel-heading"}>{renderHTML(text)}</div>
            </div>
        );
    }
  
};

// ChatMessage.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default ChatMessage;