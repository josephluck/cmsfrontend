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
			  <button className="transparent">{"-"}</button>
		  	{this.props.actions.map((action, i) => {
	  			return (
	  				<Link key={i}
	  					to={action.path}
	  					className="button left-margin">
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

Store.on('PAGE_ACTIONS_SET', function(payload) {
	Store.get().actions.reset(payload);
})

export default warmUp(PageActions, [
	['actions', 'actions']
]);