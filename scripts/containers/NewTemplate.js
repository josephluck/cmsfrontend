import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import TemplateForm from 'components/TemplateForm';
import {ModalTransition} from 'components/Transitions';

class Template extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({template: {
			errors: {},
			attributes: []
		}})
	}

	submitTemplate(form) {
		Store.get().forms.template.set({
			"loading": true,
			"error": false
		});

		Api.post({
			url: {
				name: 'templates'
			},
			payload: {
				field_template: form
			}
		}).then((res) => {
			Store.get().templates.unshift(res);
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
	  return (
	  	<div className="flex-1">
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
		  			onSubmit={this.submitTemplate.bind(this)}
		  			state={this.props.form}></TemplateForm>
		  	</div>
		  </div>
	  );
	}
}

Template.defaultProps = {
	form: {
		errors: {},
		attributes: [],
		attribute_currently_editing: {}
	}
}

export default warmUp(Template, [
	['form', 'forms', 'template']
]);