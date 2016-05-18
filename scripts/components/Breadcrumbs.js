import React from 'react';
import {Link} from 'react-router'

class Breadcrumbs extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	  return (
	  	<span className="breadcrumbs">
		  	{this.props.breadcrumbs.map((crumb, i) => {
	  			return (
	  				<span key={i}>
		  				{i > 0 ?
		  					<span className="breadcrumb-breaker ss-navigateright">{""}</span>
		  					: null
		  				}
	  					{crumb.name ?
	  						<span>
	  							{crumb.link ?
	  								<Link key={i} to={crumb.link}>{crumb.name}</Link>
	  								:
	  								<span key={i}>{crumb.name}</span>
	  							}
	  						</span>
	  						:
	  						<span>
	  							{"..."}
	  						</span>
	  					}
	  				</span>
	  			)
		  	})}
			</span>
	  );
	}
}

export default Breadcrumbs;