import React from 'react';
import {Link} from 'react-router'

class Breadcrumbs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	  return (
	  	<h3>
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
			</h3>
	  );
	}
}

export default Breadcrumbs;