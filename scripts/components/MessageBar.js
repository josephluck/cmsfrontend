import React from 'react';

function MessageBar({
	text
}) {
	console.log(text)
  return (
  	<div className="message-bar">
  		{text}
	  </div>
  );
}

export default MessageBar;