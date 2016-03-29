import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			company: [],
			company_loading: true
		});
	}
	componentWillMount() {
		Api.get({
			url: {
				name: 'company',
				id: this.props.company_id
			}
		}).then((body) => {
			Store.get().company.reset(body);
			Store.get().set({company_loading: false})
		}, (err) => {
			Store.get().company.reset([]);
			Store.get().set({company_loading: false})
		})
	}
	render() {
	  return (
	  	<div>
	  		<div className="subnav container flex vertical-align">
	  			<h3 className="flex-1">Settings</h3>
	  		</div>

	  		<hr />

		  	<div className="container">
			  	<Block loading={this.props.loading}>
			  		<h1>{"Settings"}</h1>
			  	</Block>
			  </div>

			  {this.props.children}
			</div>
	  );
	}
}

Settings.defaultProps = {
	company: {}
}

export default warmUp(Settings, [
	['company_id', 'user', 'company_id'],
	['company', 'company'],
	['loading', 'company_loading']
]);