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
	  	<div className="flex-1">
				<MidBar
					breadcrumbs={[
						{
							name: 'Sites',
							link: '/sites/view'
						},
						{
							name: this.props.site.title,
							link: `/sites/${this.props.site.id}/view`
						},
						{
							name: 'Edit'
						}
					]} />

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
		Api.redirect(`/sites/${Store.get().site.id}/view`);
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