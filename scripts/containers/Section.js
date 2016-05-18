import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import {PageTransition} from 'components/Transitions';

class Section extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		Api.get({
			url: {
				name: 'section',
				id: this.props.params.id,
				section_id: this.props.params.section_id
			}
		}).then((body) => {
			Store.get().section.reset(body);
			Store.get().set({section_loading: false})
		}, (err) => {
			Store.get().section.reset({});
			Store.get().set({section_loading: false})
		})
	}

	componentWillUnmount() {
		Store.get().section.reset({})
	}

	render() {
	  return (
	  	<PageTransition routes={this.props.routes}
	  		route={this.props.route}>
	  		{this.props.children}
	  	</PageTransition>
	  );
	}
}

Section.defaultProps = {
	section: {
		items: []
	},
	loading: true
}

export default warmUp(Section, [
	['section', 'section'],
	['loading', 'section_loading']
]);