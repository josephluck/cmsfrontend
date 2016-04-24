import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';

class DeleteTemplate extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<DeleteForm
	  		title="Delete template"
	  		loading={this.props.template.loading}
	  		onSubmit={this.props.submitDelete}
	  		cancelLinkPath={`/templates/view`}>
	  	</DeleteForm>
	  );
	}
}

function submitDelete() {
	Store.get().template.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'template',
			template_id: Store.get().template.id
		}
	}).then((res) => {
		Api.redirect(`/templates/view`);
	}, (err) => {
		debugger
	})
}

export default warmUp(DeleteTemplate, [
	['template', 'template'],
	['submitDelete', submitDelete]
]);