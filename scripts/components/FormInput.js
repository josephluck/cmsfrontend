import React from 'react';

function FormInput({
	title,
	error,
	children
}) {
  let form_input_class = "form-input";

  if (error) {
    form_input_class += ' with-error';
  }
  return (
  	<div className={form_input_class}>
  		{title ?
  			<span className="form-input-label">{title}</span>
  			: null
  		}
	  	{children}
	  	{error ?
        <span className="form-input-error">
          {(title || "") + " "}{error}
        </span>
        : null
      }
	  </div>
  );
}

export default FormInput;