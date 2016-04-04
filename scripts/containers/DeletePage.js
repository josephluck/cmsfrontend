import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';

class DeletePage extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<DeleteForm
	  		title="Delete page"
	  		loading={this.props.page.loading}
	  		onSubmit={this.props.submitDelete}
	  		cancelLinkPath={`sites/${this.props.site.id}/pages/${this.props.page.id}/view`}>
	  	</DeleteForm>
	  );
	}
}

function submitDelete() {
	Store.get().page.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'page',
			page_id: Store.get().page.id
		}
	}).then((res) => {
		let section_index = Store.get().site.pages.map((page) => {
			return page.id
		}).indexOf(Store.get().page.id);

		Store.get().site.pages.splice(section_index, 1);

		window.location.hash = `#sites/${Store.get().site.id}/view`;
	}, (err) => {
		debugger
	})
}

export default warmUp(DeletePage, [
	['site', 'site'],
	['page', 'page'],
	['submitDelete', submitDelete]
]);