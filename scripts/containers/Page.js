import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

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
			Store.get().page.reset({});
			Store.get().set({page_loading: false})
		})
	}

	render() {
	  return (
	  	<div>
		  	{this.props.children}
			</div>
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