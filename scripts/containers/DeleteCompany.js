import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import FormInput from 'components/FormInput';

let words = ["Slay", "Destroy", "Nuke", "Annihilate", "Smash", "Explode", "Sabotage", "Eliminate", "Blast", "Smite", "Pulverize"];
let random_word = words[Math.floor(Math.random() * words.length)];

class DeleteCompany extends React.Component {
	constructor(props, context) {
		super(props);
	}
	render() {
	  return (
	  	<form className="modal"
	  		onSubmit={this.props.submitDelete}>
	  		<div className="container">
	  			<h3>Delete company</h3>
	  		</div>
	  		<div className="container modal-content">
	  			<p>{"We're sad to see you go :-("}</p>
	  			<br />
	  			<p>
	  				{"To confirm you're sure you want to leave, please enter the word "}
	  				<strong>
	  					{`${random_word}`}
	  				</strong>
	  				{" into the box below and click Delete"}
	  			</p>
	  			<div className="container">
		  			<FormInput error={this.props.error}>
		  			  <input name="title"
		  			    type="text"
		  			    onChange={(e) => {
		  			      this.props.onConfirmationType(e.target.value);
		  			    }} />
		  			</FormInput>
		  		</div>
	  		</div>
  			<div className="modal-footer container text-align-right">
  				<Link to={"settings/view"}>
  					{"Cancel"}
  				</Link>
  				<button onClick={this.props.submitDelete}>
  					{this.props.company.loading ?
  						"Deleting"
  						: "Delete"
  					}
  				</button>
  			</div>
		  </form>
	  );
	}
}

function submitDelete(e) {
	e.preventDefault();
	if (Store.get().delete_company_confirmation === random_word) {
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
	} else {
		Store.get().set({
			delete_company_confirmation_error: `Please enter ${random_word}`
		})
	}
}

function onConfirmationType(text) {
	Store.get().set({
		delete_company_confirmation: text
	});
}

export default warmUp(DeleteCompany, [
	['company', 'company'],
	['error', 'delete_company_confirmation_error'],
	['submitDelete', submitDelete],
	['onConfirmationType', onConfirmationType]
]);