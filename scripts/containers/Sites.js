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
			console.log(Store.get().sites.toJS());
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
		let order = sites.map((site, i) => {
			return {
				id: site.id,
				order: i
			}
		})
		console.log(order)

		Api.post({
			url: {
				name: 'reorder_sites'
			},
			payload: {
				order: order
			}
		}).then((res) => {
		}, (err) => {
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