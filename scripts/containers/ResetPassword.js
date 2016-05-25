import React from 'react';
import Store from 'store/Store';
import Api from 'utils/Api';

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		let reset_password_token = props.location.query.reset_password_token;
		debugger
	}

	render() {
	  return (
	  	<div></div>
	  );
	}
}

export default ResetPassword