import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';

class DeletePage extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<div className="modal">
	  		<div className="container">
	  			<h3>Delete page</h3>
	  		</div>
	  		<div className="container modal-content">
	  			<p>{`To confirm you want to delete page ${this.props.page.title} press the delete button below.`}</p>
	  		</div>
  			<div className="modal-footer container text-align-right">
  				<Link to={`pages/${this.props.page.id}/view`}>
  					{"Cancel"}
  				</Link>
  				<button onClick={this.props.submitDelete}>
  					{this.props.page.loading ?
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
	Store.get().page.set({
		"loading": true
	});
	Api.destroy({
		url: {
			name: 'page',
			id: Store.get().page.id
		}
	}).then((res) => {
		window.location.hash = "#pages/view";
	}, (err) => {
		debugger
	})
}

export default warmUp(DeletePage, [
	['page', 'page'],
	['submitDelete', submitDelete]
]);