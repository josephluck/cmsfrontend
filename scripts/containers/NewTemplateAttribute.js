import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import TemplateAttributeForm from 'components/TemplateAttributeForm';

class TemplateAttribute extends React.Component {
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

		Api.post({
			url: {
				name: 'template_attributes'
			},
			payload: form
		}).then((res) => {
			Store.get().template.attributes.push(res);
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
  						name: "New attribute"
  					}
  				]} />
		  	<div className="container">
		  		<TemplateAttributeForm
		  			onSubmit={this.submitTemplateAttribute}
		  			state={this.props.form}></TemplateAttributeForm>
		  	</div>
		  </div>
	  );
	}
}

TemplateAttribute.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(TemplateAttribute, [
	['template', 'template'],
	['form', 'forms', 'template_attribute']
]);