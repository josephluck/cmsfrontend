import React from 'react';

function Block({
	loading,
	children
}) {
  return (
  	<div>
	  	{loading ?
	  		<div>{"Loading"}</div>
	  		:
	  		<div>{children}</div>
	  	}
	  </div>
  );
}

export default Block;