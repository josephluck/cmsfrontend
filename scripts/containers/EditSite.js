import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import SiteForm from 'components/SiteForm';

class EditSite extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({site: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div>
		  	<div className="subnav container flex vertical-align">
	  			<div className="flex-1">
		  			<h3>
		  				<Link to="sites/view">{"Sites"}</Link>
		  				{this.props.site.title ?
		  					<span>
				  				{" / "}
				  				<Link to={`sites/${this.props.site.id}/view`}>{this.props.site.title}</Link>
				  				{" / Edit"}
				  			</span>
			  				: null
			  			}
		  			</h3>
		  		</div>
		  		<button className="transparent">{"Hidden"}</button>
		  	</div>

		  	<hr />

		  	<div className="container">
		  		<Block loading={!this.props.site.title}>
			  		<SiteForm
			  			onSubmit={submitSite}
			  			state={this.props.form}
			  			data={this.props.site}>
			  		</SiteForm>
			  	</Block>
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

	Api.put({
		url: {
			name: 'site',
			site_id: Store.get().site.id
		},
		payload: form
	}).then((res) => {
		Store.get().site.reset(res);
		window.location.hash = `#sites/${Store.get().site.id}/view`;
	}, (err) => {
		Store.get().forms.site.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditSite.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditSite, [
	['site', 'site'],
	['form', 'forms', 'site'],
	['submitSite', submitSite]
]);