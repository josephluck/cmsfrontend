import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Link} from 'react-router'

class PageActions extends React.Component {
	constructor(props) {
		super(props);
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

export default PageActions;