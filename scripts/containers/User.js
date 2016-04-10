import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log('getting');
		Api.get({
			url: {
				name: 'user',
				id: this.props.params.id
			}
		}).then((body) => {
			Store.get().team_member.set(body);
			Store.get().set({team_member_loading: false})
		}, (err) => {
			Store.get().team_member.reset({});
			Store.get().set({team_member_loading: false})
		})
	}

	render() {
	  return this.props.children
	}
}

User.defaultProps = {
	team_member: {},
	loading: true
}

export default warmUp(User, [
	['team_member', 'team_member'],
	['loading', 'team_member_loading']
]);