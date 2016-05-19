import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import * as _ from 'underscore';

import { Link } from 'react-router';
import Block from 'components/Block';
import SitesList from 'components/SitesList';
import MidBar from 'components/MidBar';

class Sites extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
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

	componentWillUnmount() {
		Store.get().sites.reset([])
	}

	handleReorder(sites) {
		let order = {}
		_.each(sites, function(site, i) {
			order[site.id] = i
		})


	}

	render() {
	  return (
	  	<div>
  			<MidBar
  				breadcrumbs={[
						{
							name: 'Sites'
						}
					]}
					actions={[
						{
							name: 'New site',
							path: '/sites/new'
						}
					]} />
		  	<div className="container">
			  	<Block loading={this.props.loading}>
			  		<SitesList sites={this.props.sites}
			  			onReorder={this.handleReorder} />
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
	['loading', '/sites_loading']
]);