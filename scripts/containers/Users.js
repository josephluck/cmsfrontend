import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';
import UsersList from 'components/UsersList';

class Users extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			users: [],
			users_loading: true
		});
	}
	componentWillMount() {
		Api.get({
			url: {
				name: 'users'
			}
		}).then((body) => {
			Store.get().users.reset(body);
			Store.get().set({users_loading: false})
		}, (err) => {
			Store.get().users.reset([]);
			Store.get().set({users_loading: false})
		})
	}
	render() {
	  return (
	  	<div>
	  		<div className="subnav container flex vertical-align">
	  			<h3 className="flex-1">Users</h3>
	  			<Link className="button"
	  				to="users/new">
	  				{"New user"}
	  			</Link>
	  		</div>

	  		<hr />

		  	<div className="container">
			  	<Block loading={this.props.loading}>
			  		<UsersList
			  			currentUser={this.props.user}
			  			users={this.props.users} />
			  	</Block>
			  </div>

			  {this.props.children}
			</div>
	  );
	}
}

Users.defaultProps = {
	user: {},
	users: []
}

export default warmUp(Users, [
	['user', 'user'],
	['users', 'users'],
	['loading', 'users_loading']
]);