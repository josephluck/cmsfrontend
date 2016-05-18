import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';
import {PageTransition} from 'components/Transitions';

import Block from 'components/Block';

class Page extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		Api.get({
			url: {
				name: 'page',
				page_id: this.props.params.page_id
			}
		}).then((body) => {
			Store.get().page.reset(body);
			Store.get().set({page_loading: false})
		}, (err) => {
			Store.get().page.reset({
				sections: []
			});
			Store.get().set({page_loading: false})
		})
	}

	componentWillUnmount() {
		Store.get().page.reset({
			sections: []
		});
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

Page.defaultProps = {
	page: {
		sections: []
	},
	loading: true
}

export default warmUp(Page, [
	['page', 'page'],
	['loading', 'page_loading']
]);