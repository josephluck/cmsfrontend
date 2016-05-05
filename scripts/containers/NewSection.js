import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import SectionForm from 'components/SectionForm';

class NewSection extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({new_section: {
			errors: {},
			items: []
		}})
	}
	submitSection(form) {
		Store.get().forms.new_section.set({
			"loading": true,
			"error": false
		});

		form['page_id'] = Store.get().page.id;

		Api.post({
			url: {
				name: 'sections'
			},
			payload: form
		}).then((res) => {
			Store.get().page.sections.unshift(res);
			Api.redirect(`/sites/${Store.get().site.id}/pages/${Store.get().page.id}/view`);
		}, (err) => {
			Store.get().forms.new_section.set({
				"loading": false,
				"error": true,
				"errors": err.errors
			});
		})
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
							name: 'New section'
						}
					]} />
		  	<div className="container">
		  		<SectionForm
		  			onSubmit={this.submitSection}
		  			state={this.props.form}>
		  		</SectionForm>
		  	</div>
		  </div>
	  );
	}
}

NewSection.defaultProps = {
	form: {
		errors: {},
		items: []
	}
}

export default warmUp(NewSection, [
	['site', 'site'],
	['page', 'page'],
	['form', 'forms', 'new_section']
]);