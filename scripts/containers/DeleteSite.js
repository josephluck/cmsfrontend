import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';

class DeleteSite extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<DeleteForm
	  		title="Delete site"
	  		loading={this.props.site.loading}
	  		onSubmit={this.props.submitDelete}
	  		cancelLinkPath={`sites/view`}>
	  	</DeleteForm>
	  );
	}
}

function submitDelete() {
	Store.get().site.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'site',
			site_id: Store.get().site.id
		}
	}).then((res) => {
		window.location.hash = `#sites/view`;
	}, (err) => {
		debugger
	})
}

export default warmUp(DeleteSite, [
	['site', 'site'],
	['submitDelete', submitDelete]
]);