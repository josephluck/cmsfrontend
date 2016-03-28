import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';
import PageForm from 'components/PageForm';

class EditPage extends React.Component {
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
		  				{this.props.page.title ?
		  					<span>
				  				{" / "}
				  				<Link to={`pages/${this.props.page.id}/view`}>{this.props.page.title}</Link>
				  				{" / Edit"}
				  			</span>
			  				: null
			  			}
		  			</h3>
		  		</div>
		  		<button className="transparent">{"Hidden"}</button>
		  	</div>

		  	<hr />

		  	<div className="container">
		  		<Block loading={!this.props.page.title}>
			  		<PageForm
			  			onSubmit={submitPage}
			  			state={this.props.form}
			  			data={this.props.page}>
			  		</PageForm>
			  	</Block>
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

	Api.put({
		url: {
			name: 'page',
			id: Store.get().page.id
		},
		payload: form
	}).then((res) => {
		Store.get().page.reset(res);
		window.location.hash = `#pages/${Store.get().page.id}/view`;
	}, (err) => {
		Store.get().forms.page.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditPage.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditPage, [
	['page', 'page'],
	['form', 'forms', 'page'],
	['submitPage', submitPage]
]);