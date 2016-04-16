import React, {Component} from 'react';
import {Link} from 'react-router';

function Website() {
  return (
  	<div className="login-wrapper">
  		<div className="login-inner">
  			<div className="container">
	  			<Link className="button"
	  				to="/register">
	  				{"Register"}
	  			</Link>
	  			<Link className="button left-margin"
	  				to="/login">
	  				{"Login"}
	  			</Link>
	  		</div>
  		</div>
  	</div>
  );
}

export default Website;
