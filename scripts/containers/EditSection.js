import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';
import PageForm from 'components/PageForm';

class EditSection extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({section: {
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
				  				{this.props.section.title ?
				  					<span>
				  						{" / "}
				  						<Link to={`pages/${this.props.page.id}/sections/${this.props.section.id}/view`}>{this.props.section.title}</Link>
				  						{" / Edit"}
				  					</span>
				  					: null
				  				}
				  			</span>
			  				: null
			  			}
		  			</h3>
		  		</div>
		  		<button className="transparent">{"Hidden"}</button>
		  	</div>

		  	<hr />

		  	<div className="container">
		  		<Block loading={!this.props.section.title}>
			  		<PageForm
			  			onSubmit={submitPage}
			  			state={this.props.form}
			  			data={this.props.section}>
			  		</PageForm>
			  	</Block>
		  	</div>
		  </div>
	  );
	}
}

function submitPage (form) {
	Store.get().forms.section.set({
		"loading": true,
		"error": false
	});

	form['page_id'] = Store.get().page.id;

	Api.put({
		url: {
			name: 'section',
			section_id: Store.get().section.id
		},
		payload: form
	}).then((res) => {
		Store.get().section.reset(res);
		window.location.hash = `#pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`;
	}, (err) => {
		Store.get().forms.section.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditSection.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(EditSection, [
	['page', 'page'],
	['section', 'section'],
	['form', 'forms', 'section'],
	['submitPage', submitPage]
]);