import React from 'react';
import { warmUp } from 'react-freezer-js';

import { Link } from 'react-router';
import Block from 'components/Block';
import NoResults from 'components/NoResults';

class ViewSection extends React.Component {
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
						  				<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/view`}>{this.props.page.title}</Link>
						  				{this.props.section.title ?
						  					<span>
						  						{" / "}
						  						{this.props.section.title}
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
	  			<div>
		  			<Link className="button"
		  				to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view/delete`}>
		  				{"Delete"}
		  			</Link>
		  			<Link className="button left-margin"
		  				to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/edit`}>
		  				{"Edit"}
		  			</Link>
		  		</div>
	  		</div>

	  		<hr />

	  		<div className="container">
	  			<Block loading={this.props.loading}>
	  	  		<div className="container flex vertical-align">
	  	  			<h3 className="flex-1">Items</h3>
	  	  			<Link className="button"
	  	  				to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/new_item`}>
	  	  				{"New item"}
	  	  			</Link>
	  	  		</div>
	  		  	<div className="container">
	  		  		<NoResults noResults={!this.props.section.items.length}
	  		  			name="items">
	  		  			<ul className="list">
		  		  			{this.props.section.items.map((item, i) => {
		  		  				return (
			  		  				<li key={i}
			  		  					className="list-item flex">
			  		  					<span className="flex-1 ellipsis">{item.title}</span>
			  		  					<span className="flex-0 list-buttons">
			  		  						<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/items/${item.id}/edit`}>{"Edit"}</Link>
			  		  						<Link to={`sites/${this.props.site.id}/pages/${this.props.page.id}/sections/${this.props.section.id}/view/items/${item.id}/delete`}>{"Delete"}</Link>
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