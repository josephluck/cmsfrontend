import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

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
		// Store.get().sites.reset([])
	}

	handleReorder(e, moved_item, item_prev_index, item_new_index, sites) {
		Store.get().sites.reset(sites);
		let order = sites.map((site, i) => {
			return {
				id: site.id,
				order: i
			}
		})

		Api.post({
			url: {
				name: 'reorder_sites'
			},
			payload: {
				order: order
			}
		})
	}

	render() {
	  return (
	  	<div className="flex-1">
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
	['sites', 'sites']
]);