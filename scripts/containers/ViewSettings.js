import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';

import {Link} from 'react-router';
import Block from 'components/Block';
import {ModalTransition} from 'components/Transitions';

class ViewSettings extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
	  return (
  		<div className="container">
  			<Block loading={this.props.company_loading}>
  				<div>
			  		<div className="container flex vertical-align">
			  			<h3 className="flex-1">{"Company details"}</h3>
			  			<Link className="button"
			  				to="/settings/view/delete">
			  				{"Delete account"}
			  			</Link>
			  			<Link className="button left-margin"
			  				to="/settings">
			  				{"Edit"}
			  			</Link>
			  		</div>
				  	<div className="box container">
				  		<div className="flex bottom-margin">
				  			<span className="field-label">
				  				{"Company name"}
				  			</span>
				  			<span className="field">
				  				{this.props.company.name}
				  			</span>
				  		</div>
				  		<div className="flex bottom-margin">
				  			<span className="field-label">
				  				{"Company email"}
				  			</span>
				  			<span className="field">
				  				{this.props.company.email}
				  			</span>
				  		</div>
				  		<div className="flex row-wrap">
				  			<span className="field-label">
				  				{"API Key"}
				  			</span>
				  			<span className="field flex-1">
				  				{this.props.company.auth_token}
				  			</span>
				  			<span className="field-help top-margin">
				  				{"Use this key to authenticate requests to the Aircontent API. "}
				  				<a href="">{"Show me how"}</a>
				  			</span>
				  		</div>
				  	</div>
				  </div>
		  	</Block>
		  	<ModalTransition routes={this.props.routes}
		  		route={this.props.route}>
		  		{this.props.children || <div></div>}
		  	</ModalTransition>
		  </div>
	  );
	}
}

ViewSettings.defaultProps = {
	company: {}
}

export default warmUp(ViewSettings, [
	['company', 'company'],
	['company_loading', 'company_loading']
]);