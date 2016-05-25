import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';
import ErrorBar from 'components/ErrorBar';
import {Link} from 'react-router';

class ForgottenPassword extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({
			forgotten_password: {}
		})
	}
	render() {
	  return (
  		<form name="forgotten_password"
  	    onSubmit={(e) => {
  	  		e.preventDefault();
  	  		this.props.submitForgottenPassword(FormHelper.serialize(e.target));
  	  	}}>
	  		<div className="modal-header">
	  			<h3>{"Forgotten password"}</h3>
	  		</div>
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
		  		</div>
		  	</div>
		    <div className="modal-footer container flex vertical-align">
		      <div className="flex-1">
		        <span>
		          {"Remembered? "}
		        </span>
		        <Link to="/login">
		          {"Login"}
		        </Link>
		      </div>
		      <div class="flex-0">
		  		  <button type="submit">
		          {this.props.form.loading ? "Sending instructions" : "Send instructions"}
		        </button>
		      </div>
		    </div>
		  </form>
	  );
	}
}

function submitForgottenPassword (form) {
	Store.get().forms.forgotten_password.set({
		"loading": true,
		"error": false
	});

	Api.post({
		url: {
			name: 'reset_password_email'
		},
		payload: form
	}).then((res) => {
		// Api.redirect("/sites/view");
	}, (err) => {
		Store.get().forms.forgotten_password.set({
			"loading": false,
			"error": true,
			"errors": err.errors || err.error //err.error is in the case of devise error message
		});
	})
}

ForgottenPassword.defaultProps = {
	form: {}
}

export default warmUp(ForgottenPassword, [
	['form', 'forms', 'forgotten_password'],
	['submitForgottenPassword', submitForgottenPassword]
]);