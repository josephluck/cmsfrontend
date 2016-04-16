import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import PersistentStorage from 'utils/PersistentStorage';

import FormInput from 'components/FormInput';
import {Link} from 'react-router';

class Register extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({register: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div>
		  	<div className="modal-header">
		  		<h3>{"Register"}</h3>
		  	</div>
	  		<form name="register"
	  	    onSubmit={(e) => {
	  	  		e.preventDefault();
	  	  		this.props.submitRegister(FormHelper.serialize(e.target));
	  	  	}}>
		  		<div className="container modal-content">

	  		    <FormInput title="Company name"
	  		      error={this.props.form.errors.name}>
	  		      <input name="name"
	  		        type="text" />
	  		    </FormInput>

	  		    <FormInput title="Email"
	  		      error={this.props.form.errors.email}>
	  		      <input name="email"
	  		        type="text" />
	  		    </FormInput>

	  		    <FormInput title="Password"
	  		      error={this.props.form.errors.password}>
	  		      <input name="password"
	  		        type="password" />
	  		    </FormInput>

	  		    <FormInput title="Password confirmation"
	  		      error={this.props.form.errors.password_confirmation}>
	  		      <input name="password_confirmation"
	  		        type="password" />
	  		    </FormInput>
			    </div>
		  	</form>
		  	<div className="modal-footer container flex vertical-align">
		  	  <div className="flex-1">
		  	    <span>
		  	      {"Already have an account? "}
		  	    </span>
		  	    <Link to="/login">
		  	      {"Login"}
		  	    </Link>
		  	  </div>
		  	  <div class="flex-0">
		  	    <button type="submit">
		  	      {this.props.form.loading ? "Registering" : "Register"}
		  	    </button>
		  	  </div>
		  	</div>
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
		Api.redirect("/sites/view");
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