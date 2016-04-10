import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router'

class Breadcrumbs extends React.Component {
	constructor(props) {
		super(props);
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

export default Breadcrumbs;