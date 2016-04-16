import React from 'react';

import Profile from 'components/Profile';
import Logo from 'components/Logo';

function TopBar({}) {
  return (
  	<div>
	  	<div className="top-bar flex flex-horizontal vertical-align">
	  		<a>
	  			<span className="ss-wind"></span>
	  			<strong>{"Air Content"}</strong>
	  		</a>
	  		<div className="flex-1 text-align-right">
		  		<Profile></Profile>
		  	</div>
	  	</div>
	  </div>
  );
}

export default TopBar;