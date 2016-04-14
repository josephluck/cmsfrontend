import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import UserForm from 'components/UserForm';

class NewUser extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({user: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div>
		  	<div className="subnav container flex vertical-align">
		  		<div className="flex-1">
		  			<h3>
		  				<Link to="users/view">{"Users"}</Link>
		  				{" / New"}
		  			</h3>
		  		</div>
		  		<button className="transparent">{"Hidden"}</button>
		  	</div>

		  	<hr />

		  	<div className="container">
		  		<UserForm
		  			onSubmit={submitUser}
		  			state={this.props.form}></UserForm>
		  	</div>
		  </div>
	  );
	}
}

function submitUser (form) {
	Store.get().forms.user.set({
		"loading": true,
		"error": false
	});

	Api.post({
		url: {
			name: 'users'
		},
		payload: form
	}).then((res) => {
		Api.redirect("/users/view");
	}, (err) => {
		Store.get().forms.user.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

NewUser.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(NewUser, [
	['form', 'forms', 'user'],
	['submitUser', submitUser]
]);