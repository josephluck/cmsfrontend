import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import PersistentStorage from 'utils/PersistentStorage';

import RegisterForm from 'components/RegisterForm';

class Register extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({register: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div className="container">
	  		<RegisterForm
	  			onSubmit={submitRegister}
	  			state={this.props.form}></RegisterForm>
	  	</div>
	  );
	}
}

function submitRegister (form) {
	Store.get().forms.register.set({
		"loading": true,
		"error": false
	});

	Api.post({
		url: {
			name: 'register'
		},
		payload: form
	}).then((res) => {
		Store.get().user.reset(res.user);
		Api.setToken(res.user.auth_token);


		window.location.hash = "#pages/view";
	}, (err) => {
		Store.get().forms.register.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

Register.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(Register, [
	['form', 'forms', 'register'],
	['submitRegister', submitRegister]
]);