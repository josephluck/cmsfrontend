import React from 'react';

function FormInput({
	title,
	children
}) {
  return (
    <div>
      <h3 className="form-input-group-title">{title}</h3>
    	<div className="form-input-group">
    		{children}
  	  </div>
    </div>
  );
}

export default FormInput;