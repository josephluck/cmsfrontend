import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import PageForm from 'components/PageForm';

class EditSection extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({section: {
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
							name: this.props.page.title,
							link: `/sites/${this.props.site.id}/pages/${this.props.page.id}/view`
						},
						{
							name: this.props.section.title,
							link: `/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view`
						},
						{
							name: 'Edit'
						}
					]} />

		  	<div className="container">
		  		<Block loading={!this.props.section.title}>
			  		<PageForm
			  			onSubmit={submitPage}
			  			state={this.props.form}
			  			data={this.props.section}>
			  		</PageForm>
			  	</Block>
		  	</div>
		  </div>
	  );
	}
}

function submitPage (form) {
	Store.get().forms.section.set({
		"loading": true,
		"error": false
	});

	form['page_id'] = Store.get().page.id;

	Api.put({
		url: {
			name: 'section',
			section_id: Store.get().section.id
		},
		payload: form
	}).then((res) => {
		Store.get().section.reset(res);
		Api.redirect(`/sites/${Store.get().site.id}/pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`);
	}, (err) => {
		Store.get().forms.section.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditSection.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditSection, [
	['site', 'site'],
	['page', 'page'],
	['section', 'section'],
	['form', 'forms', 'section'],
	['submitPage', submitPage]
]);