import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import * as _ from 'underscore';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Link} from 'react-router'

class Breadcrumbs extends React.Component {
	constructor(props) {
		super(props);
		Store.get().set({
			breadcrumbs: [{
				name: 'Sites'
			}]
		});
	}

	render() {
	  return (
	  	<h3>
		  	<ReactCSSTransitionGroup
  			  component="div"
  			  transitionName="animate-breadcrumbs"
  			  transitionEnterTimeout={400}
  			  transitionLeaveTimeout={0}>
			  	{this.props.breadcrumbs.map((crumb, i) => {
		  			return (
		  				<span key={i}>
		  					{i > 0 ?
		  						<span>{" / "}</span>
		  						: null
		  					}
		  					{crumb.link ?
		  						<Link key={i} to={crumb.link}>{crumb.name}</Link>
		  						:
		  						<span key={i}>{crumb.name}</span>
		  					}
		  				</span>
		  			)
			  	})}
			  </ReactCSSTransitionGroup>
			</h3>
	  );
	}
}

Breadcrumbs.defaultProps = {
	breadcrumbs: []
}

Store.on('BREADCRUMBS_SET', function(payload) {
	Store.get().breadcrumbs.reset(payload);
})

export default warmUp(Breadcrumbs, [
	['breadcrumbs', 'breadcrumbs']
]);