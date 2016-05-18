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
				name: 'template_attribute',
				template_attribute_id: this.props.params.template_attribute_id
			}
		}).then((body) => {
			Store.get().template_attribute.reset(body);
			Store.get().set({template_attribute_loading: false})
		}, (err) => {
			Store.get().template_attribute.reset({});
			Store.get().set({template_attribute_loading: false})
		})
	}

	componentWillUnmount() {
		Store.get().template_attribute.reset({})
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
	template_attribute: {},
	loading: true
}

export default warmUp(Template, [
	['template_attribute', 'template_attribute'],
	['loading', 'template_attribute_loading']
]);