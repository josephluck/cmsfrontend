import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';

class DeleteUser extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<div className="modal">
	  		<div className="container">
	  			<h3>Delete user</h3>
	  		</div>
	  		<div className="container modal-content">
	  			<p>{`To confirm you want to delete user ${this.props.team_member.email} press the delete button below.`}</p>
	  		</div>
  			<div className="modal-footer container text-align-right">
  				<Link to={"users/view"}>
  					{"Cancel"}
  				</Link>
  				<button onClick={this.props.submitDelete}>
  					{this.props.team_member.loading ?
  						"Deleting"
  						: "Delete"
  					}
  				</button>
  			</div>
		  </div>
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

		window.location.hash = "#users/view";
	}, (err) => {
		debugger
	})
}

export default warmUp(DeleteUser, [
	['team_member', 'team_member'],
	['submitDelete', submitDelete]
]);