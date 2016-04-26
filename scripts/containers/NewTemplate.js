import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import TemplateForm from 'components/TemplateForm';
import AttributeForm from 'components/AttributeForm';
import {ModalTransition} from 'components/Transitions';

class Template extends React.Component {
	constructor(props) {
		super(props);
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
	  					name: 'New template'
	  				}
	  			]} />
	  		<div className="container">
		  		<TemplateForm
		  			onSubmit={this.props.submitTemplate}
		  			onNewAttribute={this.props.onNewAttribute}
		  			onEditAttribute={this.props.onEditAttribute}
		  			onDeleteAttribute={this.props.onDeleteAttribute}
		  			state={this.props.form}></TemplateForm>
		  	</div>
	  		{this.props.attribute_form_showing === "yes" ?
	  			<AttributeForm
	  				attribute={this.props.form.attributes.filter((attribute) => {
	  					return attribute.editing === true
	  				})}
	  				onCancel={this.props.onAttributeFormCancelLinkPressed}
	  				onSubmit={this.props.onAttributeFormSubmit}
	  				title={"New attribute"}>
	  			</AttributeForm>
	  			: null
	  		}
		  </div>
	  );
	}
}

function onNewAttribute() {
	Store.get().set({
		attribute_form_showing: "yes"
	})
}

function onEditAttribute(attribute) {
	debugger
}

function onDeleteAttribute(attribute) {
}

function onAttributeFormCancelLinkPressed() {
	Store.get().set({
		attribute_form_showing: "no"
	})
}

function onAttributeFormSubmit(attribute) {
	Store.get().forms.template.attributes.unshift(attribute);
}

function submitTemplate(form) {
	Store.get().forms.template.set({
		"loading": true,
		"error": false
	});

	Api.post({
		url: {
			name: 'templates'
		},
		payload: form
	}).then((res) => {
		Store.get().templates.unshift(res);
		Api.redirect(`/templates/view`);
	}, (err) => {
		Store.get().forms.template.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

Template.defaultProps = {
	form: {
		errors: {},
		attributes: []
	}
}

export default warmUp(Template, [
	['attribute_form_showing', 'attribute_form_showing'],
	['template', 'template'],
	['form', 'forms', 'template'],
	['submitTemplate', submitTemplate],
	['onNewAttribute', onNewAttribute],
	['onEditAttribute', onEditAttribute],
	['onDeleteAttribute', onDeleteAttribute],
	['onAttributeFormCancelLinkPressed', onAttributeFormCancelLinkPressed],
	['onAttributeFormSubmit', onAttributeFormSubmit]
]);