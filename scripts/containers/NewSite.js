import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import SiteForm from 'components/SiteForm';

class Site extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({site: {
			errors: {}
		}})
	}
	componentWillMount() {
		Store.trigger('BREADCRUMBS_SET', [
			{
				name: 'Sites',
				link: 'sites/view'
			},
			{
				name: 'New site'
			}
		])
		Store.trigger('PAGE_ACTIONS_SET', [])
	}
	render() {
	  return (
	  	<div>
		  	<div className="container">
		  		<SiteForm
		  			onSubmit={submitSite}
		  			state={this.props.form}></SiteForm>
		  	</div>
		  </div>
	  );
	}
}

function submitSite (form) {
	Store.get().forms.site.set({
		"loading": true,
		"error": false
	});

	Api.post({
		url: {
			name: 'sites'
		},
		payload: form
	}).then((res) => {
		Store.get().sites.unshift(res);
		window.location.hash = "#sites/view";
	}, (err) => {
		Store.get().forms.site.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

Site.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(Site, [
	['form', 'forms', 'site'],
	['submitSite', submitSite]
]);