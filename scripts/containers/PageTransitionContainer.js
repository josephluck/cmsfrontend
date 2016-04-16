import React from 'react';
import {PageTransition} from 'components/Transitions';

class PageTransitionContainer extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
	  return (
	  	<PageTransition routes={this.props.routes}
	  		route={this.props.route}>
	  		{this.props.children}
	  	</PageTransition>
	  )
	}
}

export default PageTransitionContainer