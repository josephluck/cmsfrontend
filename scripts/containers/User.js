import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import {PageTransition} from 'components/Transitions';

class User extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
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

	componentWillUnmount() {
		Store.get().team_member.reset({})
	}

	render() {
	  return (
	  	<PageTransition routes={this.props.routes}
	  		route={this.props.route}>
	  		{this.props.children}
	  	</PageTransition>
	  )
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