import React from 'react';
import { warmUp } from 'react-freezer-js';
import * as _ from 'underscore';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import TemplateAttributeForm from 'components/TemplateAttributeForm';

class EditTemplateAttribute extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({template_attribute: {
			errors: {}
		}})
	}
	submitTemplateAttribute(form) {
		Store.get().forms.template_attribute.set({
			"loading": true,
			"error": false
		});

		form['field_template_id'] = Store.get().template.id;

		Api.put({
			url: {
				name: 'template_attribute',
				template_attribute_id: Store.get().template_attribute.id
			},
			payload: form
		}).then((res) => {
			let template_attribute_to_update = _.findWhere(Store.get().template.attributes, {id: res.id});
			if (template_attribute_to_update) {
				template_attribute_to_update.reset(res);
			}
			Store.get().template_attribute.reset(res);
			Api.redirect(`/templates/${Store.get().template.id}/view`);
		}, (err) => {
			Store.get().forms.template_attribute.set({
				"loading": false,
				"error": true,
				"errors": err.errors
			});
		})
	}
	render() {
	  return (
	  	<div className="flex-1">
  			<MidBar
  				breadcrumbs={[
  					{
  						name: 'Templates',
  						link: '/templates/view'
  					},
  					{
  						name: this.props.template.title,
  						link: `/templates/${this.props.template.id}/view`
  					},
  					{
  						name: this.props.template_attribute.name
  					},
  					{
  						name: "Edit"
  					}
  				]} />

		  	<div className="container">
		  		<Block loading={!this.props.template_attribute.id}>
			  		<TemplateAttributeForm
			  			onSubmit={this.submitTemplateAttribute}
			  			state={this.props.form}
			  			data={this.props.template_attribute}></TemplateAttributeForm>
			  	</Block>
		  	</div>
		  </div>
	  );
	}
}

EditTemplateAttribute.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditTemplateAttribute, [
	['site', 'site'],
	['template', 'template'],
	['template_attribute', 'template_attribute'],
	['form', 'forms', 'template_attribute']
]);