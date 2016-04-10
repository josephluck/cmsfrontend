import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
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
	componentWillUnmount() {
		Store.get().forms.new_item.reset({
			errors: {},
			data: {
				fields: [{}]
			}
		})
	}
	render() {
	  return (
	  	<div>
  			<MidBar
  				breadcrumbs={[
						{
							name: 'Sites',
							link: 'sites/view'
						},
						{
							name: this.props.site.title,
							link: `sites/${this.props.site.id}/view`
						},
						{
							name: this.props.page.title,
							link: `sites/${this.props.site.id}/pages/${this.props.page.id}/view`
						},
						{
							name: this.props.section.title,
							link: `sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view`
						},
						{
							name: 'New item'
						}
					]} />

		  	<div className="container">
		  		<ItemForm
		  			onSubmit={this.props.submitItem}
		  			onTitleType={this.props.onTitleType}
		  			addAnotherField={this.props.addAnotherField}
		  			removeField={this.props.removeField}
		  			onFieldContentType={this.props.onFieldContentType}
		  			state={this.props.form}
		  			cancelPath={`sites/${Store.get().site.id}/pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`}>
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