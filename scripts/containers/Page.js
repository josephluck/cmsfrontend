import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import Block from 'components/Block';

class Page extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			page: {
				sections: []
			},
			page_loading: true
		});
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

	render() {
	  return (
	  	<Block loading={!this.props.page.id}>
		  	{this.props.children}
			</Block>
	  );
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