import React, {Component} from 'react';

function LoginContainer({
	children
}) {
  return (
  	<div className="login-wrapper">
  		<div className="login-inner">
  			{children}
  		</div>
  	</div>
  );
}

export default LoginContainer;
