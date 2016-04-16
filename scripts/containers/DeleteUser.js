import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';

class DeleteUser extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<DeleteForm
	  		title="Delete user"
	  		loading={this.props.team_member.loading}
	  		onSubmit={this.props.submitDelete}
	  		cancelLinkPath={"/users/view"}>
	  	</DeleteForm>
	  );
	}
}

function submitDelete() {
	Store.get().team_member.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'user',
			id: Store.get().team_member.id
		}
	}).then((res) => {
		let team_member_index = Store.get().users.map((user) => {
			return user.id
		}).indexOf(Store.get().team_member.id);

		Store.get().users.splice(team_member_index, 1);

		Api.redirect("/users/view");
	}, (err) => {
		debugger
	})
}

export default warmUp(DeleteUser, [
	['team_member', 'team_member'],
	['submitDelete', submitDelete]
]);