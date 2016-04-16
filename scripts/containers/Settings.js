import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';
import {PageTransition} from 'components/Transitions';

class Settings extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
	  return (
	  	<div>
  			<MidBar
  				breadcrumbs={[
						{
							name: 'Settings'
						}
					]} />
		  	<div className="container">
			  	<PageTransition routes={this.props.routes}
			  		route={this.props.route}>
			  		{this.props.children}
			  	</PageTransition>
			  </div>
			</div>
	  );
	}
}

export default warmUp(Settings, [
	['company_id', 'user', 'company_id'],
	['company', 'company']
]);