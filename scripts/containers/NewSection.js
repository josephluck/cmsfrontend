import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import SectionForm from 'components/SectionForm';
import TemplatesList from 'components/TemplatesList';
import {ModalTransition} from 'components/Transitions';

class NewSection extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({new_section: {
			errors: {},
			items: []
		}})
	}
	componentWillMount() {
		Api.get({
			url: {
				name: 'templates'
			}
		}).then((body) => {
			Store.get().templates.reset(body);
			Store.get().set({templates_loading: false})
		}, (err) => {
			Store.get().templates.reset([]);
			Store.get().set({templates_loading: false})
		});
	}
	onUseTemplateClick(template) {
		Store.get().set({
			template_currently_using: template
		})
		Store.get().set({
			item_form_showing: "yes"
		})
	}
	onItemFormCancelLinkPressed() {
		Store.get().set({
			item_form_showing: "no"
		})
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
		  	<div className="container flex page-container with-right-bar">
		  		<div className="flex-2 right-margin">
			  		<SectionForm
			  			onSubmit={this.submitSection}
			  			state={this.props.form}>
			  		</SectionForm>
			  	</div>
			  	<div className="flex-1 left-margin overflow-hidden right-bar">
			  		<Block loading={this.props.loading}>
			  			<TemplatesList templates={this.props.templates}
			  				use={true}
			  				onUseClick={this.onUseTemplateClick.bind(this)}>
			  			</TemplatesList>
			  		</Block>
			  	</div>
		  	</div>

		  	<ModalTransition transitionKey={this.props.item_form_showing}>
		  		{this.props.item_form_showing === "yes" ?
		  			<div>
		  				{"Testing"}
		  			</div>
		  			: <div></div>
		  		}
		  	</ModalTransition>
		  </div>
	  );
	}
}

NewSection.defaultProps = {
	templates: [],
	form: {
		errors: {},
		items: []
	},
	template_currently_using: {},
	item_form_showing: "no"
}

export default warmUp(NewSection, [
	['site', 'site'],
	['page', 'page'],
	['templates', 'templates'],
	['loading', 'templates_loading'],
	['form', 'forms', 'new_section']
]);