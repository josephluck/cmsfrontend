import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';

class DeleteSection extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<DeleteForm
	  		title="Delete section"
	  		loading={this.props.section.loading}
	  		onSubmit={this.props.submitDelete}
	  		cancelLinkPath={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view`}>
	  	</DeleteForm>
	  );
	}
}

function submitDelete() {
	Store.get().section.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'section',
			section_id: Store.get().section.id
		}
	}).then((res) => {
		let section_index = Store.get().page.sections.map((section) => {
			return section.id
		}).indexOf(Store.get().section.id);

		Store.get().page.sections.splice(section_index, 1);

		window.location.hash = `#sites/${Store.get().site.id}/pages/${Store.get().page.id}/view`;
	}, (err) => {
		debugger
	})
}

export default warmUp(DeleteSection, [
	['site', 'site'],
	['page', 'page'],
	['section', 'section'],
	['submitDelete', submitDelete]
]);