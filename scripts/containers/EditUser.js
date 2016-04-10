import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import UserForm from 'components/UserForm';

class EditUser extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({team_member: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div>
  			<MidBar
  				breadcrumbs={[
						{
							name: 'Users',
							link: 'users/view'
						},
						{
							name: 'Change password'
						}
					]} />

		  	<div className="container">
		  		<Block loading={!this.props.team_member.email}>
			  		<UserForm
			  			onSubmit={submitUser}
			  			state={this.props.form}
			  			data={this.props.team_member}>
			  		</UserForm>
			  	</Block>
		  	</div>
		  </div>
	  );
	}
}

function submitUser (form) {
	Store.get().forms.team_member.set({
		"loading": true,
		"error": false
	});

	form['site_id'] = 1;

	Api.put({
		url: {
			name: 'user',
			id: Store.get().team_member.id
		},
		payload: form
	}).then((res) => {
		Store.get().team_member.reset(res);
		window.location.hash = `#users/view`;
	}, (err) => {
		Store.get().forms.team_member.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditUser.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditUser, [
	['team_member', 'team_member'],
	['form', 'forms', 'team_member'],
	['submitUser', submitUser]
]);