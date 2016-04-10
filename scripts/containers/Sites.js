import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';
import SitesList from 'components/SitesList';

class Sites extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			sites: [],
			sites_loading: true
		});
	}
	componentWillMount() {
		Store.trigger('PAGE_ACTIONS_SET', [
			{
				name: 'New site',
				path: 'sites/new'
			}
		])

		Api.get({
			url: {
				name: 'sites'
			}
		}).then((body) => {
			Store.get().sites.reset(body);
			Store.get().set({sites_loading: false})
		}, (err) => {
			Store.get().sites.reset([]);
			Store.get().set({sites_loading: false})
		});
	}
	render() {
	  return (
	  	<div>
		  	<div className="container">
			  	<Block loading={this.props.loading}>
			  		<SitesList sites={this.props.sites} />
			  	</Block>
			  </div>
			</div>
	  );
	}
}

Sites.defaultProps = {
	sites: []
}

export default warmUp(Sites, [
	['sites', 'sites'],
	['loading', 'sites_loading']
]);