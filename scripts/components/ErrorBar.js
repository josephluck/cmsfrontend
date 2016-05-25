import React from 'react';

function ErrorBar({
	text
}) {
	console.log(text)
  return (
  	<div className="error-bar">
  		{text}
	  </div>
  );
}

export default ErrorBar;