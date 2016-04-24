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
	  			<h1>Testing</h1>
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
		pages: []
	}
}

export default warmUp(ViewTemplate, [
	['template', 'template'],
	['loading', 'template_loading'],
	['help_showing', 'help_showing']
]);