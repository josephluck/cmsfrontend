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
		Store.get().forms.set({template: {
			errors: {},
			attributes: []
		}})
	}
	render() {
		var attribute_currently_editing = {}
		if (this.props.attribute_currently_editing !== undefined) {
			attribute_currently_editing = this.props.attribute_currently_editing.toJS();
		}

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
	  				attributeCurrentlyEditing={attribute_currently_editing || {}}
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
	Store.get().set({
		attribute_currently_editing: attribute
	})
	Store.get().set({
		attribute_form_showing: "yes"
	})
}

function onDeleteAttribute(attribute) {
}

function onAttributeFormCancelLinkPressed() {
	Store.get().set({
		attribute_form_showing: "no"
	})
}

function onAttributeFormSubmit(new_attribute, original_attribute) {
	if (original_attribute.title) {
		let attributes = Store.get().forms.template.attributes;
		for (let i = 0, x = attributes.length; i < x; i++) {
			if (attributes[i].uuid === original_attribute.uuid) {
				attributes.splice(i, 1, new_attribute);
			}
		}
		Store.get().attribute_currently_editing.reset({});
	} else {
		Store.get().forms.template.attributes.unshift(new_attribute);
	}

	Store.get().set({
		attribute_form_showing: "no"
	})
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
		attributes: [],
		attribute_currently_editing: {}
	}
}

export default warmUp(Template, [
	['attribute_form_showing', 'attribute_form_showing'],
	['attribute_currently_editing', 'attribute_currently_editing'],
	['form', 'forms', 'template'],
	['submitTemplate', submitTemplate],
	['onNewAttribute', onNewAttribute],
	['onEditAttribute', onEditAttribute],
	['onDeleteAttribute', onDeleteAttribute],
	['onAttributeFormCancelLinkPressed', onAttributeFormCancelLinkPressed],
	['onAttributeFormSubmit', onAttributeFormSubmit]
]);