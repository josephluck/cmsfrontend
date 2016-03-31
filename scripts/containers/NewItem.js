import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import ItemForm from 'components/ItemForm';

class NewItem extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({new_item: {
			errors: {},
			data: {
				fields: [{}]
			}
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
						  				{this.props.section.title ?
						  					<span>
						  						{" / "}
						  						<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view`}>{this.props.section.title}</Link>
						  						{" / New item"}
						  					</span>
						  					: null
						  				}
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
		  		<ItemForm
		  			onSubmit={this.props.submitItem}
		  			onTitleType={this.props.onTitleType}
		  			addAnotherField={this.props.addAnotherField}
		  			removeField={this.props.removeField}
		  			onFieldContentType={this.props.onFieldContentType}
		  			state={this.props.form}>
		  		</ItemForm>
		  	</div>
		  </div>
	  );
	}
}

function submitItem(form) {
	Store.get().forms.new_item.set({
		"loading": true,
		"error": false
	});

	form['section_id'] = Store.get().section.id;

	Api.post({
		url: {
			name: 'items'
		},
		payload: form
	}).then((res) => {
		Store.get().section.items.push(res);
		window.location.hash = `#sites/${Store.get().site.id}/pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`;
	}, (err) => {
		Store.get().forms.new_item.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

function onTitleType(title) {
	Store.get().forms.new_item.data.set({
		title: title
	})
}

function addAnotherField() {
	Store.get().forms.new_item.data.fields.push({});
}

function removeField(i) {
	Store.get().forms.new_item.data.fields.splice(i, 1);
}

function onFieldContentType(i, content) {
	Store.get().forms.new_item.data.fields[i].set({
		content: content
	})
}

NewItem.defaultProps = {
	form: {
		errors: {},
		data: {
			fields: [{}]
		}
	}
}

export default warmUp(NewItem, [
	['site', 'site'],
	['page', 'page'],
	['section', 'section'],
	['form', 'forms', 'new_item'],
	['submitItem', submitItem],
	['onTitleType', onTitleType],
	['addAnotherField', addAnotherField],
	['removeField', removeField],
	['onFieldContentType', onFieldContentType]
]);