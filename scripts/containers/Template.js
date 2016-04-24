import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import {PageTransition} from 'components/Transitions';

import Block from 'components/Block';

class Template extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		Api.get({
			url: {
				name: 'template',
				template_id: this.props.params.template_id
			}
		}).then((body) => {
			Store.get().template.reset(body);
			Store.get().set({template_loading: false})
		}, (err) => {
			Store.get().template.reset({
				sections: []
			});
			Store.get().set({template_loading: false})
		})
	}

	render() {
	  return (
  		<PageTransition routes={this.props.routes}
  			route={this.props.route}>
  			{this.props.children}
  		</PageTransition>
	  )
	}
}

Template.defaultProps = {
	template: {
		sections: []
	},
	loading: true
}

export default warmUp(Template, [
	['template', 'template'],
	['loading', 'template_loading']
]);