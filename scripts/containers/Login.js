import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import PersistentStorage from 'utils/PersistentStorage';

import LoginForm from 'components/LoginForm';
import {Link} from 'react-router';

class Login extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({
			login: {}
		})
	}
	render() {
	  return (
	  	<div>
		  	<div className="container">
		  		<LoginForm
		  			onSubmit={submitLogin}
		  			state={this.props.form}></LoginForm>
		  	</div>
		  </div>
	  );
	}
}

function submitLogin (form) {
	Store.get().forms.login.set({
		"loading": true,
		"error": false
	});

	Api.post({
		url: {
			name: 'login'
		},
		payload: form
	}).then((res) => {
		Store.get().user.reset(res);
		Api.setToken(res.auth_token);

		window.location.hash = "#pages/view";
	}, (err) => {
		Store.get().forms.login.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});

		Api.removeToken();
		Store.get().user.reset({});
	})
}

Login.defaultProps = {
	form: {}
}

export default warmUp(Login, [
	['form', 'forms', 'login'],
	['submitLogin', submitLogin]
]);