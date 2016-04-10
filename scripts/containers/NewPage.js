import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import PageForm from 'components/PageForm';

class Page extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({page: {
			errors: {}
		}})
	}
	componentWillMount() {
		debugger
		Store.trigger('BREADCRUMBS_SET', [
			{
				name: 'Sites',
				link: 'sites/view'
			},
			{
				name: this.props.site.title,
				link: `sites/${this.props.site.id}/view`
			},
			{
				name: 'New page'
			}
		])
		Store.trigger('PAGE_ACTIONS_SET', [])
	}
	render() {
	  return (
	  	<div>
	  		<div className="container">
		  		<PageForm
		  			onSubmit={submitPage}
		  			state={this.props.form}></PageForm>
		  	</div>
		  </div>
	  );
	}
}

function submitPage (form) {
	Store.get().forms.page.set({
		"loading": true,
		"error": false
	});

	form['site_id'] = Store.get().site.id;

	Api.post({
		url: {
			name: 'pages'
		},
		payload: form
	}).then((res) => {
		Store.get().site.pages.unshift(res);
		window.location.hash = `#sites/${Store.get().site.id}/view`;
	}, (err) => {
		Store.get().forms.page.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

Page.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(Page, [
	['site', 'site'],
	['form', 'forms', 'page'],
	['submitPage', submitPage]
]);