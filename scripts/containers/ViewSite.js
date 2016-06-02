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

class ViewSite extends React.Component {
	constructor(props) {
		super(props);
	}

	handleReorder(e, moved_item, item_prev_index, item_new_index, pages) {
		Store.get().site.pages.reset(pages);
		let order = pages.map((page, i) => {
			return {
				id: page.id,
				order: i
			}
		})

		Api.post({
			url: {
				name: 'reorder_pages'
			},
			payload: {
				order: order
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
							link: '/sites/view'
						},
						{
							name: this.props.site.title
						}
					]}
					actions={[
						{
							name: 'Delete',
							path: `/sites/${this.props.site.id}/view/delete`
						},
						{
							name: 'Edit',
							path: `/sites/${this.props.site.id}/edit`
						}
					]} />
	  		<div className="container">
	  			<Block loading={this.props.loading}>
	  				<div>
		  	  		<div className="container flex vertical-align">
		  	  			<h3 className="flex-1">Pages</h3>
		  	  			<Link className="button"
		  	  				to={`/sites/${this.props.site.id}/new_page`}>
		  	  				{"New page"}
		  	  			</Link>
		  	  		</div>
		  		  	<div className="container">
		  		  		<h1>{this.props.pages_loading}</h1>
		  		  		<NoResults noResults={!this.props.site.pages.length}
		  		  			name="pages">
		  		  			<Reorder
		  		  			  itemKey='id'
		  		  			  lock='horizontal'
		  		  			  holdTime='100'
		  		  			  list={this.props.site.pages.toJS()}
		  		  			  template={({item}) => {
		  		  			  	return (
		  		  			  		<div className="flex">
		  		  			  			<span className="flex-1 ellipsis">{item.title}</span>
		  		  			  			<span className="flex-0 list-buttons">
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${item.id}/view`}>{"View"}</Link>
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${item.id}/edit`}>{"Edit"}</Link>
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${item.id}/view/delete`}>{"Delete"}</Link>
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

function showHelp() {
	Store.get().set({
		help_showing: true
	})
}

ViewSite.defaultProps = {
	site: {
		pages: []
	}
}

export default warmUp(ViewSite, [
	['site', 'site'],
	['loading', 'site_loading'],
	['help_showing', 'help_showing']
]);