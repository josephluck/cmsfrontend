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

				Api.get({
					url: {
						name: 'company',
						id: res.company_id
					}
				}).then((body) => {
					Store.get().set({
						company: body
					});
					Store.get().set({company_loading: false});
					Store.get().set({
						app_loading: false
					});
				}, (err) => {
					Store.get().set({
						company: {}
					});
					Store.get().set({company_loading: false})
					Api.removeToken();
					Store.get().user.reset({});
					window.location.hash = '#login';
				})
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
	['user', 'user'],
	['loading', 'app_loading']
]);
