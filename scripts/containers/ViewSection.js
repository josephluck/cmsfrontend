import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import NoResults from 'components/NoResults';
import {ModalTransition} from 'components/Transitions';
import Reorder from 'react-reorder';

class ViewSection extends React.Component {
	constructor(props) {
		super(props);
	}

	handleReorder(e, moved_item, item_prev_index, item_new_index, items) {
		Store.get().section.items.reset(items);
		let order = items.map((item, i) => {
			return {
				id: item.id,
				order: i
			}
		})

		Api.post({
			url: {
				name: 'reorder_items'
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
							name: this.props.section.title
						}
					]}
					actions={[
						{
							name: 'Delete',
							path: `/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view/delete`
						},
						{
							name: 'Edit',
							path: `/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/edit`
						}
					]} />

	  		<div className="container">
	  			<Block loading={this.props.loading}>
	  				<div>
		  	  		<div className="container flex vertical-align">
		  	  			<h3 className="flex-1">Items</h3>
		  	  			<Link className="button"
		  	  				to={`/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/new_item`}>
		  	  				{"New item"}
		  	  			</Link>
		  	  		</div>
		  		  	<div className="container">
		  		  		<NoResults noResults={!this.props.section.items.length}
		  		  			name="items">
		  		  			<Reorder
		  		  			  itemKey='id'
		  		  			  lock='horizontal'
		  		  			  holdTime='100'
		  		  			  list={this.props.section.items.toJS()}
		  		  			  template={({item}) => {
		  		  			  	return (
		  		  			  		<div className="flex">
		  		  			  			<span className="flex-1 ellipsis">{item.title}</span>
		  		  			  			<span className="flex-0 list-buttons">
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/items/${item.id}/edit`}>{"Edit"}</Link>
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view/items/${item.id}/delete`}>{"Delete"}</Link>
		  		  			  			</span>
		  		  			  		</div>
		  		  			  	)
		  		  			  }}
		  		  			  callback={this.handleReorder}
		  		  			  listClass='list'
		  		  			  itemClass='flex list-item'
		  		  			  selectedKey='id'
		  		  			  disableReorder={false}>
		  		  			</Reorder>
		  		  		</NoResults>
		  		  	</div>
		  		  </div>
			  	</Block>
			  </div>

			  <ModalTransition routes={this.props.routes}
			  	route={this.props.route}>
			  	{this.props.children || <div></div>}
			  </ModalTransition>
			</div>
	  );
	}
}

ViewSection.defaultProps = {
	section: {
		items: []
	}
}

export default warmUp(ViewSection, [
	['site', 'site'],
	['page', 'page'],
	['section', 'section'],
	['loading', 'section_loading']
]);