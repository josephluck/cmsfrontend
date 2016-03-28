import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import PageForm from 'components/PageForm';

class Page extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({page: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div>
		  	<div className="subnav container flex vertical-align">
		  		<div className="flex-1">
		  			<h3>
		  				<Link to="pages/view">{"Pages"}</Link>
		  				{" / New"}
		  			</h3>
		  		</div>
		  		<button className="transparent">{"Hidden"}</button>
		  	</div>

		  	<hr />

		  	<div className="container">
		  		<PageForm
		  			onSubmit={submitPage}
		  			state={this.props.form}></PageForm>
		  	</div>
		  </div>
	  );
	}
}

function submitPage (form) {
	Store.get().forms.page.set({
		"loading": true,
		"error": false
	});

	form['site_id'] = 1;

	Api.post({
		url: {
			name: 'pages'
		},
		payload: form
	}).then((res) => {
		window.location.hash = "#pages/view";
	}, (err) => {
		Store.get().forms.page.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

Page.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(Page, [
	['form', 'forms', 'page'],
	['submitPage', submitPage]
]);