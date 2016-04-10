import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import * as _ from 'underscore';

class Breadcrumbs extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			breadcrumbs: []
		});
	}

	componentWillReceiveProps(props) {

	}

	render() {
	  return (
	  	<h3>
		  	{this.props.breadcrumbs.map((crumb, i) => {
		  		return (
		  			<span key={i}>{crumb.name}</span>
		  		)
		  	})}
			</h3>
	  );
	}
}

Breadcrumbs.defaultProps = {
	breadcrumbs: []
}

Store.on('BREADCRUMBS_ADD', function(payload) {
	let current_breadcrumbs = Store.get().breadcrumbs,
			breadcrumb_already_exists = _.findWhere(current_breadcrumbs, {name: payload.name}) !== undefined;

	if (!breadcrumb_already_exists) {
		Store.get().breadcrumbs.push(payload);
	}
})

Store.on('BREADCRUMBS_REMOVE', function(payload) {
	Store.get().breadcrumbs.reset(_.reject(Store.get().breadcrumbs, function(crumb){ return crumb.name === payload.name }));
})

export default warmUp(Breadcrumbs, [
	['breadcrumbs', 'breadcrumbs']
]);