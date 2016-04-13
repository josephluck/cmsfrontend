import React from 'react';

import {Link} from 'react-router';

class PageActions extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	  return (
	  	<div>
		  	{this.props.actions.map((action, i) => {
	  			return (
	  				<Link key={i}
	  					to={action.path}
	  					className="button left-margin">
	  					{action.name}
	  				</Link>
	  			)
		  	})}
		  </div>
	  );
	}
}

export default PageActions;