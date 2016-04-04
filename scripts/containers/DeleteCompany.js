import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import DeleteForm from 'components/DeleteForm';


// (
// 		  	<form className="modal"
// 		  		onSubmit={this.props.submitDelete}>
// 		  		<div className="container">
// 		  			<h3>Delete company</h3>
// 		  		</div>
// 		  		<div className="container modal-content">
// 		  			<p>{"We're sad to see you go :-("}</p>
// 		  			<br />
// 		  			<p>
// 		  				{"To confirm you're sure you want to leave, please enter the word "}
// 		  				<strong>
// 		  					{`${random_word}`}
// 		  				</strong>
// 		  				{" into the box below and click Delete"}
// 		  			</p>
// 		  			<div className="container">
// 			  			<FormInput error={this.props.error}>
// 			  			  <input name="title"
// 			  			    type="text"
// 			  			    onChange={(e) => {
// 			  			      this.props.onConfirmationType(e.target.value);
// 			  			    }} />
// 			  			</FormInput>
// 			  		</div>
// 		  		</div>
// 	  			<div className="modal-footer container text-align-right">
// 	  				<Link to={"settings/view"}>
// 	  					{"Cancel"}
// 	  				</Link>
// 	  				<button onClick={this.props.submitDelete}>
// 	  					{this.props.company.loading ?
// 	  						"Deleting"
// 	  						: "Delete"
// 	  					}
// 	  				</button>
// 	  			</div>
// 			  </form>
// )
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