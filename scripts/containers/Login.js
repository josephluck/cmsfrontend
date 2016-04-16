import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import PersistentStorage from 'utils/PersistentStorage';

import FormInput from 'components/FormInput';
import ErrorBar from 'components/ErrorBar';
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
	  		<div className="modal-header">
	  			<h3>{"Login"}</h3>
	  		</div>
  			<form name="login"
  		    onSubmit={(e) => {
  		  		e.preventDefault();
  		  		this.props.submitLogin(FormHelper.serialize(e.target));
  		  	}}>
			  	<div className="container modal-content">
			  		<div>
			  		  {this.props.form.errors ?
			  		    <ErrorBar text={this.props.form.errors}></ErrorBar>
			  		    : null
			  		  }
		  		    <FormInput title="Email">
		  		      <input name="email"
		  		        type="text" />
		  		    </FormInput>

		  		    <FormInput title="Password">
		  		      <input name="password"
		  		        type="password" />
		  		    </FormInput>
			  		</div>
			  	</div>
			  </form>
		    <div className="modal-footer container flex vertical-align">
		      <div className="flex-1">
		        <span>
		          {"Don't have an account yet? "}
		        </span>
		        <Link to="/register">
		          {"Register"}
		        </Link>
		      </div>
		      <div class="flex-0">
		  		  <button type="submit">
		          {this.props.form.loading ? "Logging in" : "Login"}
		        </button>
		      </div>
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

		Api.redirect("/sites/view");
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