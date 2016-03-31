import React from 'react';
import { warmUp } from 'react-freezer-js';

import Store from 'store/Store';

import { Link } from 'react-router';
import Block from 'components/Block';
import NoResults from 'components/NoResults';
import ApiHelper from 'components/ApiHelper';

class ViewPage extends React.Component {
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
				  				<Link to={`sites/${this.props.site.id}/view`}>{this.props.site.title}</Link>
				  				{this.props.page.title ?
				  					<span>
				  						{" / "}
				  						{this.props.page.title}
				  					</span>
				  					: null
				  				}
				  			</span>
			  				: null
			  			}
		  			</h3>
		  		</div>
	  			<div>
	  				<ApiHelper
	  					route="page"
	  					params={this.props.params}>
	  				</ApiHelper>
		  			<Link className="button left-margin"
		  				to={`sites/${this.props.site.id}/pages/${this.props.page.id}/view/delete`}>
		  				{"Delete"}
		  			</Link>
		  			<Link className="button left-margin"
		  				to={`sites/${this.props.site.id}/pages/${this.props.page.id}/edit`}>
		  				{"Edit"}
		  			</Link>
		  		</div>
	  		</div>

	  		<hr />

	  		<div className="container">
	  			<Block loading={this.props.loading}>
	  	  		<div className="container flex vertical-align">
	  	  			<h3 className="flex-1">Sections</h3>
	  	  			<Link className="button"
	  	  				to={`sites/${this.props.site.id}/pages/${this.props.page.id}/new_section`}>
	  	  				{"New section"}
	  	  			</Link>
	  	  		</div>
	  		  	<div className="container">
	  		  		<NoResults noResults={!this.props.page.sections.length}
	  		  			name="sections">
	  		  			<ul className="list">
		  		  			{this.props.page.sections.map((section, i) => {
		  		  				return (
			  		  				<li key={i}
			  		  					className="list-item flex">
			  		  					<span className="flex-1 ellipsis">{section.title}</span>
			  		  					<span className="flex-0 list-buttons">
			  		  						<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${section.id}/view`}>{"View"}</Link>
			  		  						<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${section.id}/edit`}>{"Edit"}</Link>
			  		  						<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${section.id}/view/delete`}>{"Delete"}</Link>
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