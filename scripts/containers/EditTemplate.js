import React from 'react';
import { warmUp } from 'react-freezer-js';
import * as _ from 'underscore';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import TemplateForm from 'components/TemplateForm';
import AttributeForm from 'components/AttributeForm';
import {ModalTransition} from 'components/Transitions';

class EditTemplate extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({template: {
			errors: {},
			attributes: []
		}})
	}
	componentWillReceiveProps(props) {
		if (props.template.id && !Store.get().forms.template.id) {
			Store.get().forms.set({template: {
				errors: {},
				...props.template
			}})
		}
	}

	submitTemplate(form) {
		Store.get().forms.template.set({
			"loading": true,
			"error": false
		});

		// var aa = Store;

		Api.put({
			url: {
				name: 'template',
				template_id: Store.get().template.id
			},
			payload: {
				field_template: {
					...form,
					attributes: Store.get().forms.template.attributes
				}
			}
		}).then((res) => {
			debugger
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

	onNewAttributeButtonClick() {
		Store.get().set({
			attribute_form_showing: "yes",
			attribute_currently_editing: {}
		})
	}

	onEditAttributeButtonClick(attribute) {
		Store.get().set({
			attribute_currently_editing: attribute
		})
		Store.get().set({
			attribute_form_showing: "yes"
		})
	}

	onDeleteAttributeButtonClick(attribute) {
	}

	onAttributeFormCancelLinkPressed() {
		Store.get().set({
			attribute_form_showing: "no"
		})
	}

	onAttributeFormSubmit(new_attribute, original_attribute) {
		if (Object.keys(original_attribute).length) {
			let attribute_to_update = _.findWhere(Store.get().forms.template.attributes, {id: new_attribute.id})

			attribute_to_update.reset(new_attribute);
		} else {
			Store.get().forms.template.attributes.push(new_attribute);
		}
		Store.get().set({
			attribute_form_showing: "no"
		})
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
							name: this.props.template.title
						},
						{
	  					name: 'Edit'
	  				}
	  			]} />
	  		<div className="container">
	  			<Block loading={!this.props.template.title}>
			  		<TemplateForm
			  			onSubmit={this.submitTemplate.bind(this)}
			  			onNewAttributeButtonClick={this.onNewAttributeButtonClick.bind(this)}
			  			onEditAttributeButtonClick={this.onEditAttributeButtonClick.bind(this)}
			  			onDeleteAttributeButtonClick={this.onDeleteAttributeButtonClick.bind(this)}
			  			state={this.props.form}
			  			data={this.props.template}></TemplateForm>
			  	</Block>
		  	</div>
	  		{this.props.attribute_form_showing === "yes" ?
	  			<AttributeForm
	  				attributeCurrentlyEditing={attribute_currently_editing || {}}
	  				onCancel={this.onAttributeFormCancelLinkPressed.bind(this)}
	  				onSubmit={this.onAttributeFormSubmit.bind(this)}
	  				title={"New attribute"}>
	  			</AttributeForm>
	  			: null
	  		}
		  </div>
	  );
	}
}

EditTemplate.defaultProps = {
	form: {
		errors: {},
		attributes: [],
		attribute_currently_editing: {}
	}
}

export default warmUp(EditTemplate, [
	['template', 'template'],
	['form', 'forms', 'template'],
	['attribute_form_showing', 'attribute_form_showing'],
	['attribute_currently_editing', 'attribute_currently_editing']
]);