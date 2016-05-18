import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';
import PagesList from 'components/PagesList';

class Pages extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		Api.get({
			url: {
				name: 'pages'
			}
		}).then((body) => {
			Store.get().pages.reset(body);
			Store.get().set({pages_loading: false})
		}, (err) => {
			Store.get().pages.reset([]);
			Store.get().set({pages_loading: false})
		})
	}

	componentWillUnmount() {
		Store.get().pages.reset({})
	}

	render() {
	  return (
	  	<div>
	  		<div className="subnav container flex vertical-align">
	  			<div className="flex-1">
	  				<h3>
	  					{"Pages"}
	  				</h3>
	  			</div>
	  			<Link className="button"
	  				to="pages/new">
	  				{"New page"}
	  			</Link>
	  		</div>

	  		<hr />

		  	<div className="container">
			  	<Block loading={this.props.loading}>
			  		<PagesList pages={this.props.pages} />
			  	</Block>
			  </div>
			</div>
	  );
	}
}

Pages.defaultProps = {
	pages: []
}

export default warmUp(Pages, [
	['pages', 'pages'],
	['loading', 'pages_loading']
]);