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
		Api.get({
			url: {
				name: 'sites'
			}
		}).then((body) => {
			Store.get().sites.reset(body);
			Store.get().set({sites_loading: false})

			Store.trigger('BREADCRUMBS_ADD', {
				name: 'Sites'
			})
		}, (err) => {
			Store.get().sites.reset([]);
			Store.get().set({sites_loading: false})
		});
	}
	render() {
	  return (
	  	<div>
	  		<div className="subnav container flex vertical-align">
	  			<div className="flex-1">
	  				<h3>
	  					{"Sites"}
	  				</h3>
	  			</div>
	  			<Link className="button"
	  				to="sites/new">
	  				{"New site"}
	  			</Link>
	  		</div>

	  		<hr />

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