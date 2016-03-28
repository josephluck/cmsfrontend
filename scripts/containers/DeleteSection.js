import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';

class DeleteSection extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<div className="modal">
	  		<div className="container">
	  			<h3>Delete section</h3>
	  		</div>
	  		<div className="container modal-content">
	  			<p>{`To confirm you want to delete section ${this.props.section.title} press the delete button below.`}</p>
	  		</div>
  			<div className="modal-footer container text-align-right">
  				<Link to={`pages/${this.props.page.id}/sections/${this.props.section.id}/view`}>
  					{"Cancel"}
  				</Link>
  				<button onClick={this.props.submitDelete}>
  					{this.props.section.loading ?
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

		window.location.hash = `#pages/${Store.get().page.id}/view`;
	}, (err) => {
		debugger
	})
}

export default warmUp(DeleteSection, [
	['page', 'page'],
	['section', 'section'],
	['submitDelete', submitDelete]
]);