import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import * as _ from 'underscore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Link} from 'react-router'

class PageActions extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			actions: []
		});
	}

	render() {
	  return (
	  	<ReactCSSTransitionGroup
			  component="div"
			  transitionName="animate-breadcrumbs"
			  transitionEnterTimeout={400}
			  transitionLeaveTimeout={0}>
			  <button className="transparent">{"Hidden"}</button>
		  	{this.props.actions.map((action, i) => {
	  			return (
	  				<Link to={action.path}
	  					className="button">
	  					{action.name}
	  				</Link>
	  			)
		  	})}
		  </ReactCSSTransitionGroup>
	  );
	}
}

PageActions.defaultProps = {
	actions: []
}

Store.on('PAGE_ACTIONS_ADD', function(payload) {
	let current_actions = Store.get().actions,
			action_already_exists = _.findWhere(current_actions, {name: payload.name}) !== undefined;

	if (!action_already_exists) {
		Store.get().actions.push(payload);
	}
})

Store.on('PAGE_ACTIONS_REMOVE', function(payload) {
	Store.get().actions.reset(_.reject(Store.get().actions, function(action){ return action.name === payload.name }));
})

export default warmUp(PageActions, [
	['actions', 'actions']
]);