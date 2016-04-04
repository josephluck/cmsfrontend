import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';

class DeleteItem extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<div className="modal">
	  		<div className="container">
	  			<h3>{"Delete item"}</h3>
	  		</div>
	  		<div className="container modal-content">
	  			<p>{`To confirm you want to delete item ${this.props.item.title} press the delete button below.`}</p>
	  		</div>
  			<div className="modal-footer container text-align-right">
  				<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view`}>
  					{"Cancel"}
  				</Link>
  				<button onClick={this.props.submitDelete}>
  					{this.props.item.loading ?
  						"Deleting"
  						: "Delete"
  					}
  				</button>
  			</div>
		  </div>
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

		window.location.hash = `#sites/${Store.get().site.id}/pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`;
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