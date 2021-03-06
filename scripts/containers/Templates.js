import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';
import TemplatesList from 'components/TemplatesList';
import MidBar from 'components/MidBar';

class Templates extends React.Component {
	constructor(props) {
		super(props);
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

	componentWillUnmount() {
		// Store.get().templates.reset([])
	}

	handleReorder(e, moved_item, item_prev_index, item_new_index, templates) {
		Store.get().templates.reset(templates);
		let order = templates.map((template, i) => {
			return {
				id: template.id,
				order: i
			}
		})

		Api.post({
			url: {
				name: 'reorder_templates'
			},
			payload: {
				order: order
			}
		})
	}

	render() {
	  return (
	  	<div className="flex-1">
  			<MidBar
  				breadcrumbs={[
						{
							name: 'Templates'
						}
					]}
					actions={[
						{
							name: 'New template',
							path: '/templates/new'
						}
					]} />
		  	<div className="container">
			  	<Block loading={this.props.loading}>
			  		<TemplatesList
			  			templates={this.props.templates}
			  			onReorder={::this.handleReorder} />
			  	</Block>
			  </div>
			</div>
	  );
	}
}

Templates.defaultProps = {
	templates: []
}

export default warmUp(Templates, [
	['templates', 'templates'],
	['loading', 'templates_loading']
]);