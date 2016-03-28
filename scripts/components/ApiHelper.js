import React from 'react';
import { warmUp } from 'react-freezer-js';
import Store from 'store/Store';

function ApiHelper({
	route,
	params,
	showing,
	showHelp,
	closeHelp
}) {
	let api_url;
	switch (route) {
		case 'page':
			api_url = `pages/${params.id}`
	}
  return (
  	<span>
  		<button onClick={showHelp}>
  			{"Access"}
  		</button>
  		{showing ?
  			<div className="modal">
  				<div className="container">
  					<h3>{"Api help"}</h3>
  				</div>
  				<div className="container modal-content">
  					{api_url}
  				</div>
  				<div className="modal-footer container text-align-right">
  					<a href="" onClick={closeHelp}>
  						{"Close"}
  					</a>
  				</div>
  			</div>
  			: null
  		}
	  </span>
  );
}

function closeHelp(e) {
	e.preventDefault();
	Store.get().set({
		help_showing: false
	})
}


function showHelp() {
	Store.get().set({
		help_showing: true
	})
}

export default warmUp(ApiHelper, [
	['showing', 'help_showing'],
	['showHelp', showHelp],
	['closeHelp', closeHelp]
]);