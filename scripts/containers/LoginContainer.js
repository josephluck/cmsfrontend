import React, {Component} from 'react';

function LoginContainer({
	children
}) {
	// Add in some transitons between the modals here :)
  return (
  	<div className="login-wrapper">
  		<div className="login-inner">
  			{children}
  		</div>
  	</div>
  );
}

export default LoginContainer;
