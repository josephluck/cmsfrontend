import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import TemplateForm from 'components/TemplateForm';

class EditTemplate extends React.Component {
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
			  			onSubmit={submitTemplate}
			  			state={this.props.form}
			  			data={this.props.template}>
			  		</TemplateForm>
			  	</Block>
		  	</div>
		  </div>
	  );
	}
}

function submitTemplate (form) {
	Store.get().forms.template.set({
		"loading": true,
		"error": false
	});

	Api.put({
		url: {
			name: 'template',
			template_id: Store.get().template.id
		},
		payload: form
	}).then((res) => {
		Store.get().template.reset(res);
		Api.redirect(`/templates/${Store.get().template.id}/view`);
	}, (err) => {
		Store.get().forms.template.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditTemplate.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditTemplate, [
	['template', 'template'],
	['form', 'forms', 'template'],
	['submitTemplate', submitTemplate]
]);