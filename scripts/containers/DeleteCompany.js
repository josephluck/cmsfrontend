import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';

class DeleteCompany extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<DeleteForm
	  		title="Delete company"
	  		loading={this.props.company.loading}
	  		onSubmit={this.props.submitDelete}
	  		cancelLinkPath="settings/view">
	  		<div>
	  			<p>{"We're sad to see you go :-("}</p>
	  			<br />
	  			<br />
	  		</div>
	  	</DeleteForm>
	  );
	}
}

function submitDelete() {
	Store.get().company.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'company',
			id: Store.get().company.id
		}
	}).then((res) => {
		Api.removeToken();
		Store.get().user.reset({});
		window.location.hash = "/";
	});
}

function onConfirmationType(text) {
	Store.get().set({
		delete_company_confirmation: text
	});
}

export default warmUp(DeleteCompany, [
	['company', 'company'],
	['submitDelete', submitDelete],
	['onConfirmationType', onConfirmationType]
]);