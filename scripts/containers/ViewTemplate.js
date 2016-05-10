import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import NoResults from 'components/NoResults';
import {ModalTransition} from 'components/Transitions';

class ViewTemplate extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.template)
	  return (
	  	<div>
				<MidBar
					breadcrumbs={[
						{
							name: 'Templates',
							link: '/templates/view'
						},
						{
							name: this.props.template.title
						}
					]}
					actions={[
						{
							name: 'Delete',
							path: `/templates/${this.props.template.id}/view/delete`
						},
						{
							name: 'Edit',
							path: `/templates/${this.props.template.id}/edit`
						}
					]} />
		  		<div className="container">
		  			<Block loading={this.props.loading}>
		  	  		<div className="container flex vertical-align">
		  	  			<h3 className="flex-1">Attributes</h3>
		  	  			<Link className="button"
		  	  				to={`/templates/${this.props.template.id}/new_attribute`}>
		  	  				{"New attribute"}
		  	  			</Link>
		  	  		</div>
		  		  	<div className="container">
		  		  		<NoResults noResults={!this.props.template.attributes.length}
		  		  			name="attributes">
		  		  			<ul className="list">
			  		  			{this.props.template.attributes.map((attribute, i) => {
			  		  				return (
				  		  				<li key={i}
				  		  					className="list-item flex">
				  		  					<span className="flex-1 ellipsis">{attribute.name}</span>
				  		  					<span className="flex-0 list-buttons">
				  		  						<a href="">{"Edit"}</a>
				  		  						<a href="">{"Delete"}</a>
				  		  					</span>
				  		  				</li>
				  		  			)
			  		  			})}
			  		  		</ul>
		  		  		</NoResults>
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

ViewTemplate.defaultProps = {
	template: {
		attributes: []
	}
}

export default warmUp(ViewTemplate, [
	['template', 'template'],
	['loading', 'template_loading']
]);