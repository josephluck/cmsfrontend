import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import UsersList from 'components/UsersList';

import {ModalTransition} from 'components/Transitions';

class Users extends React.Component {
	constructor(props) {
		super(props);
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

	componentWillUnmount() {
		// Store.get().users.reset([])
	}

	render() {
	  return (
	  	<div>
  			<MidBar
  				breadcrumbs={[
						{
							name: 'Users'
						}
					]}
					actions={[
						{
							name: 'New user',
							path: '/users/new'
						}
					]} />

		  	<div className="container">
			  	<Block loading={this.props.loading}>
			  		<UsersList
			  			currentUser={this.props.user}
			  			users={this.props.users} />
			  	</Block>
			  </div>

			  <ModalTransition routes={this.props.routes}
			  	route={this.props.route}>
			  	{this.props.children || <div></div>}
			  </ModalTransition>
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