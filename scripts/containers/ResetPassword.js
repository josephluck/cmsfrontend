import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import ResetPasswordForm from 'components/ResetPasswordForm';

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({
			reset_password: {}
		})
	}

	submitResetPassword(form) {
		Store.get().forms.reset_password.set({
			"loading": true,
			"error": false
		});

		form['reset_password_token'] = this.props.location.query.reset_password_token

		Api.post({
			url: {
				name: 'reset_password'
			},
			payload: form
		}).then((res) => {
			// Should log the user in here
			Store.get().user.reset(res);
			Api.setToken(res.auth_token);

			Api.redirect("/sites/view");
			window.location.reload();
		}, (err) => {
			Store.get().forms.reset_password.set({
				"loading": false,
				"error": true,
				"errors": err.errors
			});
		})
	}

	render() {
	  return (
	  	<div>
	  		<ResetPasswordForm
	  			onSubmit={this.submitResetPassword.bind(this)}
	  			state={this.props.form}></ResetPasswordForm>
	  	</div>
	  );
	}
}

ResetPassword.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(ResetPassword, [
	['form', 'forms', 'reset_password']
]);