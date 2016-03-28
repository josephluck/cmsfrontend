import React from 'react';

function FormInput({
	title,
	error,
	children
}) {
  return (
  	<div className="input">
  		{title ?
  			<label>{title}</label>
  			: null
  		}
	  	{children}
	  	{error ? <span>{error}</span> : null}
	  </div>
  );
}

export default FormInput;