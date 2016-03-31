import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';
import Api from 'utils/Api';

import { Link } from 'react-router';
import Block from 'components/Block';

class Settings extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
	  return (
	  	<div>
	  		<div className="subnav container flex vertical-align">
	  			<h3 className="flex-1">Settings</h3>
	  		</div>

	  		<hr />

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