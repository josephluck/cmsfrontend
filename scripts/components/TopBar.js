import React from 'react';

import Profile from 'components/Profile';
import Logo from 'components/Logo';

function TopBar({}) {
  return (
  	<div>
	  	<div className="top-bar flex flex-horizontal vertical-align">
	  		<Logo className="flex-0" />
	  		<a>
	  			<span className="logo ss-wind"></span>
	  			{"Air Content"}
	  		</a>
	  		<div className="flex-1 text-align-right">
		  		<Profile></Profile>
		  	</div>
	  	</div>
	  </div>
  );
}

export default TopBar;