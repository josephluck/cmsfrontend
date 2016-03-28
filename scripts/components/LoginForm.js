import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function LoginForm({
	onSubmit,
	state
}) {
  return (
  	<form name="login"
      onSubmit={(e) => {
    		e.preventDefault();
    		onSubmit(FormHelper.serialize(e.target));
    	}}>

      <p>{"joseph@cms.io / 12345678"}</p>

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

      <div className="text-align-right">
  		  <button type="submit">
          {state.loading ? "Logging in" : "Login"}
        </button>
      </div>
  	</form>
  );
}

export default LoginForm;