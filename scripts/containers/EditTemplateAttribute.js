import React from 'react';
import { warmUp } from 'react-freezer-js';
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
	render() {
	  return (
	  	<div>
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