import React from 'react';
import Store from 'store/Store';
import Api from 'utils/Api';

class ConfirmAccount extends React.Component {
	constructor(props) {
		super(props);
		let confirmation_token = props.location.query.confirmation_token;

		Api.get({
			url: {
				name: 'confirm_account',
				confirmation_token: confirmation_token
			}
		}).then((body) => {
			Api.redirect("/login");
		}, (err) => {
			alert("Error confirming user")
			Api.redirect("/login");
		})
	}

	render() {
	  return (
	  	<div></div>
	  );
	}
}

export default ConfirmAccount