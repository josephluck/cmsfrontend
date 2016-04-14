import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';

class DeleteItem extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<DeleteForm
	  		title="Delete item"
	  		loading={this.props.item.loading}
	  		onSubmit={this.props.submitDelete}
	  		cancelLinkPath={`/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view`}>
	  	</DeleteForm>
	  );
	}
}

function submitDelete() {
	Store.get().item.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'item',
			item_id: Store.get().item.id
		}
	}).then((res) => {
		let item_index = Store.get().section.items.map((item) => {
			return item.id
		}).indexOf(Store.get().item.id);

		Store.get().section.items.splice(item_index, 1);

		Api.redirect(`/sites/${Store.get().site.id}/pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`);
	}, (err) => {
		debugger
	})
}

export default warmUp(DeleteItem, [
	['site', 'site'],
	['page', 'page'],
	['section', 'section'],
	['item', 'item'],
	['submitDelete', submitDelete]
]);