import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import NoResults from 'components/NoResults';
import {ModalTransition} from 'components/Transitions';

class ViewSite extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// console.log('ViewSite.js: ' + this.props.location.pathname.split('/')[4]);
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
	  	  		<div className="container flex vertical-align">
	  	  			<h3 className="flex-1">Pages</h3>
	  	  			<Link className="button"
	  	  				to={`/sites/${this.props.site.id}/new_page`}>
	  	  				{"New page"}
	  	  			</Link>
	  	  		</div>
	  		  	<div className="container">
	  		  		<NoResults noResults={!this.props.site.pages.length}
	  		  			name="pages">
	  		  			<ul className="list">
		  		  			{this.props.site.pages.map((page, i) => {
		  		  				return (
			  		  				<li key={i}
			  		  					className="list-item flex">
			  		  					<span className="flex-1 ellipsis">{page.title}</span>
			  		  					<span className="flex-0 list-buttons">
			  		  						<Link to={`/sites/${this.props.site.id}/pages/${page.id}/view`}>{"View"}</Link>
			  		  						<Link to={`/sites/${this.props.site.id}/pages/${page.id}/edit`}>{"Edit"}</Link>
			  		  						<Link to={`/sites/${this.props.site.id}/pages/${page.id}/view/delete`}>{"Delete"}</Link>
			  		  					</span>
			  		  				</li>
			  		  			)
		  		  			})}
		  		  		</ul>
	  		  		</NoResults>
	  		  	</div>
			  	</Block>
			  </div>

			  <ModalTransition transitionKey={this.props.location.pathname.split('/')[4] || 'root'}>
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