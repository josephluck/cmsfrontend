import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import {PageTransition} from 'components/Transitions';

class Site extends React.Component {
	constructor(props) {
		super(props);
		Api.get({
			url: {
				name: 'site',
				site_id: this.props.params.site_id
			}
		}).then((body) => {
			Store.get().site.reset(body);
			Store.get().set({site_loading: false});
		}, (err) => {
			Store.get().site.reset({});
			Store.get().set({site_loading: false})
		})
	}
	render() {
		console.log(this.props.location.pathname);
		const key = this.props.location.pathname.split('/')[4] || 'root';

	  return (
	  	<PageTransition transitionKey={key}>
	  		{this.props.children}
	  	</PageTransition>
	  )
	}
}

Site.defaultProps = {
	site: {},
	loading: true
}

export default warmUp(Site, [
	['site', 'site'],
	['loading', 'site_loading']
]);