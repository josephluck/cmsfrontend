import React, {Component} from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import PersistentStorage from 'utils/PersistentStorage';
import Api from 'utils/Api';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {PageTransition} from 'components/Transitions';

import TopBar from 'components/TopBar';

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
					Api.redirect('/login');
				})
			}, (err) => {
				Api.removeToken();
				Store.get().user.reset({});
				Api.redirect('/login');
			})
		} else {
			Api.redirect('/login');
		}
	}
	render() {
		if (this.props.user.email) {
			return (
  			<div className="app-container">
	  			<TopBar />
	  			<PageTransition routes={this.props.routes}
	  				route={this.props.route}>
	  				{this.props.children}
	  			</PageTransition>
	  		</div>
			)
		} else {
			return null
		}
	}
}

export default warmUp(RequireLogin, [
	['user', 'user'],
	['loading', 'app_loading']
]);