import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import SectionForm from 'components/SectionForm';

class NewSection extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({new_section: {
			errors: {}
		}})
	}
	render() {
	  return (
	  	<div>
		  	<div className="subnav container flex vertical-align">
	  			<div className="flex-1">
		  			<h3>
		  				<Link to="sites/view">{"Sites"}</Link>
		  				{this.props.site.title ?
		  					<span>
				  				{" / "}
				  				<Link to={`sites/${this.props.site.id}/view`}>{this.props.site.title}</Link>
				  				{this.props.page.title ?
				  					<span>
				  						{" / "}
				  						<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/view`}>{this.props.page.title}</Link>
				  						{" / New section"}
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
		  		<SectionForm
		  			onSubmit={submitSection}
		  			state={this.props.form}>
		  		</SectionForm>
		  	</div>
		  </div>
	  );
	}
}

function submitSection(form) {
	Store.get().forms.new_section.set({
		"loading": true,
		"error": false
	});

	form['page_id'] = Store.get().page.id;

	Api.post({
		url: {
			name: 'sections'
		},
		payload: form
	}).then((res) => {
		Store.get().page.sections.unshift(res);
		window.location.hash = `#sites/${Store.get().site.id}/pages/${Store.get().page.id}/view`;
	}, (err) => {
		Store.get().forms.new_section.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

NewSection.defaultProps = {
	form: {
		errors: {}
	}
}

export default warmUp(NewSection, [
	['site', 'site'],
	['page', 'page'],
	['form', 'forms', 'new_section'],
	['submitSection', submitSection]
]);