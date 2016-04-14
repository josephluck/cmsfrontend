import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import PageForm from 'components/PageForm';

class EditPage extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({page: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div>
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
							name: this.props.page.title,
							link: `/sites/${this.props.site.id}/pages/${this.props.page.id}/view`
						},
						{
							name: 'Edit'
						}
					]} />

		  	<div className="container">
		  		<Block loading={!this.props.page.title}>
			  		<PageForm
			  			onSubmit={submitPage}
			  			state={this.props.form}
			  			data={this.props.page}>
			  		</PageForm>
			  	</Block>
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

	Api.put({
		url: {
			name: 'page',
			page_id: Store.get().page.id
		},
		payload: form
	}).then((res) => {
		Store.get().page.reset(res);
		Api.redirect(`/sites/${Store.get().site.id}/pages/${Store.get().page.id}/view`);
	}, (err) => {
		Store.get().forms.page.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditPage.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditPage, [
	['site', 'site'],
	['page', 'page'],
	['form', 'forms', 'page'],
	['submitPage', submitPage]
]);