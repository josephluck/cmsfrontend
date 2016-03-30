import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';

class DeleteSite extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<div className="modal">
	  		<div className="container">
	  			<h3>{"Delete site"}</h3>
	  		</div>
	  		<div className="container modal-content">
	  			<p>{`To confirm you want to delete site ${this.props.site.title} press the delete button below.`}</p>
	  		</div>
  			<div className="modal-footer container text-align-right">
  				<Link to={`sites/view`}>
  					{"Cancel"}
  				</Link>
  				<button onClick={this.props.submitDelete}>
  					{this.props.site.loading ?
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