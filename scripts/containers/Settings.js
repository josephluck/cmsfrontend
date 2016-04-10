import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import MidBar from 'components/MidBar';
import Block from 'components/Block';

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
					]}
					actions={[]} />
		  	<div className="container">
			  	{this.props.children}
			  </div>
			</div>
	  );
	}
}

export default warmUp(Settings, [
	['company_id', 'user', 'company_id'],
	['company', 'company']
]);