import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import {ModalTransition} from 'components/Transitions';

class Item extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		Api.get({
			url: {
				name: 'item',
				item_id: this.props.params.item_id
			}
		}).then((body) => {
			Store.get().item.reset(body);
			Store.get().set({item_loading: false})
		}, (err) => {
			Store.get().item.reset({});
			Store.get().set({item_loading: false})
		})
	}
	componentWillUnmount() {
		Store.get().item.reset({})
	}

	render() {
	  return (
	  	<ModalTransition routes={this.props.routes}
	  		route={this.props.route}>
	  		{this.props.children || <div></div>}
	  	</ModalTransition>
	  )
	}
}

Item.defaultProps = {
	item: {
		fields: []
	},
	loading: true
}

export default warmUp(Item, [
	['item', 'item'],
	['loading', 'item_loading']
]);