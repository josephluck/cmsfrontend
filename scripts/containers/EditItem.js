import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import * as _ from 'underscore';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import ItemForm from 'components/ItemForm';

class EditItem extends React.Component {
	constructor(props) {
		super(props);
		Store.get().forms.set({edit_item: {
			errors: {},
			data: {
				fields: []
			}
		}})
	}
	componentWillMount() {
		Api.get({
		  url: {
		    name: 'templates'
		  }
		}).then((body) => {
		  Store.get().templates.reset(body);
		  Store.get().set({templates_loading: false})
		}, (err) => {
		  Store.get().templates.reset([]);
		  Store.get().set({templates_loading: false})
		});
	}
	render() {
	  return (
	  	<div>
  			<MidBar
  				breadcrumbs={[
						{
							name: 'Sites',
							link: '/sites/view'
						},
						{
							name: this.props.site.title,
							link: `/sites/${this.props.site.id}/view`
						},
						{
							name: this.props.page.title,
							link: `/sites/${this.props.site.id}/pages/${this.props.page.id}/view`
						},
						{
							name: this.props.section.title,
							link: `/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view`
						},
						{
							name: this.props.item.title
						},
						{
							name: 'Edit'
						}
					]} />

		  	<div className="container">
		  		<Block loading={!this.props.item.id || this.props.templates_loading}>
	  				<ItemForm
	  					state={this.props.form}
	  					onSubmit={this.props.submitItem}
	  					templates={this.props.templates.toJS()}
	  					data={this.props.item.toJS()}
	  					loading={false}>
	  				</ItemForm>
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
		Api.redirect(`/sites/${Store.get().site.id}/pages/${Store.get().page.id}/sections/${Store.get().section.id}/view`);
	}, (err) => {
		Store.get().forms.edit_item.set({
			"loading": false,
			"error": true,
			"errors": err.errors
		});
	})
}

EditItem.defaultProps = {
	templates_loading: true,
	form: {
		errors: {},
		data: {
			fields: []
		}
	}
}

export default warmUp(EditItem, [
	['site', 'site'],
	['page', 'page'],
	['section', 'section'],
	['item', 'item'],
	['templates', 'templates'],
	['templates_loading', 'templates_loading'],
	['form', 'forms', 'edit_item'],
	['submitItem', submitItem]
]);