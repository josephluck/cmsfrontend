import React from 'react';
import { warmUp } from 'react-freezer-js';
import * as _ from 'underscore';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import TemplateForm from 'components/TemplateForm';
import {ModalTransition} from 'components/Transitions';

class EditTemplate extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({template: {
			errors: {}
		}})
	}

	submitTemplate(form) {
		Store.get().forms.template.set({
			"loading": true,
			"error": false
		});

		Api.put({
			url: {
				name: 'template',
				template_id: Store.get().template.id
			},
			payload: {
				field_template: form
			}
		}).then((res) => {
			let template_to_update = _.findWhere(Store.get().templates, {id: res.id});
			if (template_to_update) {
				template_to_update.reset(res);
			}
			Store.get().template.reset(res);
			Api.redirect(`/templates/${res.id}/view`);
		}, (err) => {
			Store.get().forms.template.set({
				"loading": false,
				"error": true,
				"errors": err.errors
			});
		})
	}

	render() {
		var attribute_currently_editing = {}
		if (this.props.attribute_currently_editing !== undefined) {
			attribute_currently_editing = this.props.attribute_currently_editing.toJS();
		}

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
	  					name: 'Edit'
	  				}
	  			]} />
	  		<div className="container">
	  			<Block loading={!this.props.template.title}>
			  		<TemplateForm
			  			onSubmit={this.submitTemplate.bind(this)}
			  			state={this.props.form}
			  			data={this.props.template}></TemplateForm>
			  	</Block>
		  	</div>
		  </div>
	  );
	}
}

EditTemplate.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditTemplate, [
	['template', 'template'],
	['form', 'forms', 'template']
]);