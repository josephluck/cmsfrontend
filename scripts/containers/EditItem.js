import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import * as _ from 'underscore';

import { Link } from 'react-router';
import Block from 'components/Block';
import ItemForm from 'components/ItemForm';

class EditItem extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({edit_item: {
			errors: {},
			data: {}
		}})
	}
	componentWillMount() {
		this.set_form_from_server = false;
	}
	componentWillReceiveProps(props) {
		if (props.item.title && this.set_form_from_server === false) {
			let item_form_data = props.item.toJS();

			if (item_form_data.fields.length === 0) {
				item_form_data.fields = [{}];
			}
			Store.get().forms.set({edit_item: {
				errors: {},
				data: item_form_data
			}});

			this.set_form_from_server = true;
		}
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
						  						{this.props.item.title ?
						  							<span>
						  								{` / ${this.props.item.title} / Edit`}
						  							</span>
						  							: null
						  						}
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
		  		<Block loading={!this.props.item.id}>
		  			{this.props.form.data.fields ?
		  				<ItemForm
		  					state={this.props.form}
		  					onSubmit={this.props.submitItem}
		  					onTitleType={this.props.onTitleType}
		  					addAnotherField={this.props.addAnotherField}
		  					removeField={this.props.removeField}
		  					onFieldContentType={this.props.onFieldContentType}>
		  				</ItemForm>
		  				: null
		  			}
			  	</Block>
		  	</div>
		  </div>
	  );
	}
}

function submitItem(form) {
	Store.get().forms.edit_item.set({
		"loading": true,
		"error": false
	});

	form['section_id'] = Store.get().section.id;

	Api.put({
		url: {
			name: 'item',
			item_id: Store.get().item.id
		},
		payload: form
	}).then((res) => {
		let item_index = _.findIndex(Store.get().section.items.toJS(), function(item) { return item.id == res.id });
		Store.get().section.items[item_index].reset(res);
		window.location.hash = `#sites/${Store.get().site.id}/pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`;
	}, (err) => {
		Store.get().forms.edit_item.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

function onTitleType(title) {
	Store.get().forms.edit_item.data.set({
		title: title
	})
}

function addAnotherField() {
	Store.get().forms.edit_item.data.fields.push({});
}

function removeField(i) {
	Store.get().forms.edit_item.data.fields.splice(i, 1);
}

function onFieldContentType(i, content) {
	Store.get().forms.edit_item.data.fields[i].set({
		content: content
	})
}

EditItem.defaultProps = {
	form: {
		errors: {},
		data: {}
	}
}

export default warmUp(EditItem, [
	['site', 'site'],
	['page', 'page'],
	['section', 'section'],
	['item', 'item'],
	['form', 'forms', 'edit_item'],
	['submitItem', submitItem],
	['onTitleType', onTitleType],
	['addAnotherField', addAnotherField],
	['removeField', removeField],
	['onFieldContentType', onFieldContentType]
]);