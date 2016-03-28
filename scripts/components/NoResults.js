import React from 'react';

function NoResults({
	noResults,
	name,
	children
}) {
  return (
  	<div>
	  	{noResults ?
	  		<div className="box">
	  			{`No ${name} found`}
	  		</div>
	  		:
	  		<div>
	  			{children}
	  		</div>
	  	}
	  </div>
  );
}

export default NoResults;