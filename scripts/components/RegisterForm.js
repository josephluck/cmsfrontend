import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function RegisterForm({
	onSubmit,
	state
}) {
  return (
  	<form name="register"
      onSubmit={(e) => {
    		e.preventDefault();
    		onSubmit(FormHelper.serialize(e.target));
    	}}>

      <FormInput title="Company name"
        error={state.errors.name}>
        <input name="name"
          type="text" />
      </FormInput>

      <FormInput title="Email"
        error={state.errors.email}>
        <input name="email"
          type="text" />
      </FormInput>

      <FormInput title="Password"
        error={state.errors.password}>
        <input name="password"
          type="password" />
      </FormInput>

      <FormInput title="Password confirmation"
        error={state.errors.password_confirmation}>
        <input name="password_confirmation"
          type="password" />
      </FormInput>

      <div className="text-align-right">
  		  <button type="submit">
          {state.loading ? "Registering" : "Register"}
        </button>
      </div>
  	</form>
  );
}

export default RegisterForm;