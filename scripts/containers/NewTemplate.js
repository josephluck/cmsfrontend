import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import TemplateForm from 'components/TemplateForm';

class Template extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({template: {
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
	  					name: 'New template'
	  				}
	  			]} />
	  		<div className="container">
		  		<TemplateForm
		  			onSubmit={submitTemplate}
		  			onAddAttribute={onAddAttribute}
		  			onEditAttribute={onEditAttribute}
		  			onDeleteAttribute={onDeleteAttribute}
		  			state={this.props.form}></TemplateForm>
		  	</div>
		  </div>
	  );
	}
}

function onAddAttribute() {
	debugger
}

function onEditAttribute(attribute) {
	debugger
}

function onDeleteAttribute(attribute) {
	debugger
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
		errors: {}
	}
}

export default warmUp(Template, [
	['template', 'template'],
	['form', 'forms', 'template'],
	['submitTemplate', submitTemplate]
]);