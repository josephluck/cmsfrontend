import React, {Component} from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import PersistentStorage from 'utils/PersistentStorage';
import Api from 'utils/Api';

import TopBar from 'containers/TopBar';

class RequireLogin extends Component {
	componentWillMount() {
		let token = PersistentStorage.get('token');

		if (token) {
			Api.get({
				url: {
					name: 'login',
					token: token
				}
			}).then((res) => {
				Store.get().user.reset(res);
				Api.setToken(res.auth_token);
			}, (err) => {
				Api.removeToken();
				Store.get().user.reset({});
				window.location.hash = '#login';
			})
		} else {
			window.location.hash = '#login';
		}
	}
	render() {
		return (
	  	<div>
	  		{this.props.user.email ?
	  			<div>
		  			<TopBar />
		  			{this.props.children}
		  		</div>
		  		: null
	  		}
		  </div>
	  );
	}
}

export default warmUp(RequireLogin, [
	['user', 'user']
]);
