import React from 'react';
import { warmUp } from 'react-freezer-js';

import Store from 'store/Store';

import { Link } from 'react-router';
import Block from 'components/Block';
import NoResults from 'components/NoResults';
import ApiHelper from 'components/ApiHelper';

class ViewSite extends React.Component {
	constructor(props) {
		super(props);
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
		  						{this.props.site.title}
		  					</span>
		  					: null
		  				}
		  			</h3>
		  		</div>
	  			<div>
	  				<ApiHelper route="site" params={this.props.params}></ApiHelper>
		  			<Link className="button left-margin"
		  				to={`sites/${this.props.site.id}/view/delete`}>
		  				{"Delete"}
		  			</Link>
		  			<Link className="button left-margin"
		  				to={`sites/${this.props.site.id}/edit`}>
		  				{"Edit"}
		  			</Link>
		  		</div>
	  		</div>

	  		<hr />

	  		<div className="container">
	  			<Block loading={this.props.loading}>
	  	  		<div className="container flex vertical-align">
	  	  			<h3 className="flex-1">Pages</h3>
	  	  			<Link className="button"
	  	  				to={`sites/${this.props.site.id}/pages/new`}>
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
			  		  						<Link to={`sites/${this.props.site.id}/pages/${page.id}/view`}>{"View"}</Link>
			  		  						<Link to={`sites/${this.props.site.id}/pages/${page.id}/edit`}>{"Edit"}</Link>
			  		  						<Link to={`sites/${this.props.site.id}/pages/${page.id}/view/delete`}>{"Delete"}</Link>
			  		  					</span>
			  		  				</li>
			  		  			)
		  		  			})}
		  		  		</ul>
	  		  		</NoResults>
	  		  	</div>
			  	</Block>
			  </div>

			  {this.props.children}
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