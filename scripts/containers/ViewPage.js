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

class ViewPage extends React.Component {
	constructor(props) {
		super(props);
	}

	handleReorder(e, moved_item, item_prev_index, item_new_index, sections) {
		Store.get().page.sections.reset(sections);
		let order = sections.map((section, i) => {
			return {
				id: section.id,
				order: i
			}
		})

		Api.post({
			url: {
				name: 'reorder_sections'
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
							name: this.props.page.title
						}
					]}
					current_path={`/sites/${this.props.site.id}/pages/${this.props.page.id}/view`}
					actions={[
						{
							name: 'Delete',
							path: `/sites/${this.props.site.id}/pages/${this.props.page.id}/view/delete`
						},
						{
							name: 'Edit',
							path: `/sites/${this.props.site.id}/pages/${this.props.page.id}/edit`
						}
					]} />
	  		<div className="container">
	  			<Block loading={this.props.loading}>
	  				<div>
		  	  		<div className="container flex vertical-align">
		  	  			<h3 className="flex-1">Sections</h3>
		  	  			<Link className="button"
		  	  				to={`/sites/${this.props.site.id}/pages/${this.props.page.id}/new_section`}>
		  	  				{"New section"}
		  	  			</Link>
		  	  		</div>
		  		  	<div className="container">
		  		  		<NoResults noResults={!this.props.page.sections.length}
		  		  			name="sections">
		  		  			<Reorder
		  		  			  itemKey='id'
		  		  			  lock='horizontal'
		  		  			  holdTime='100'
		  		  			  list={this.props.page.sections.toJS()}
		  		  			  template={({item}) => {
		  		  			  	return (
		  		  			  		<div className="flex">
		  		  			  			<span className="flex-1 ellipsis">{item.title}</span>
		  		  			  			<span className="flex-0 list-buttons">
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${item.id}/view`}>{"View"}</Link>
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${item.id}/edit`}>{"Edit"}</Link>
		  		  			  				<Link to={`/sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${item.id}/view/delete`}>{"Delete"}</Link>
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

ViewPage.defaultProps = {
	page: {
		sections: []
	}
}

export default warmUp(ViewPage, [
	['site', 'site'],
	['page', 'page'],
	['loading', 'page_loading'],
	['help_showing', 'help_showing']
]);