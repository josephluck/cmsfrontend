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

      <div className="container flex vertical-align">
        <div className="flex-1">
          <span>
            {"Don't have an account yet? "}
          </span>
          <a href="#/">
            {"Register"}
          </a>
        </div>
        <div class="flex-0">
    		  <button type="submit">
            {state.loading ? "Logging in" : "Login"}
          </button>
        </div>
      </div>
  	</form>
  );
}

export default LoginForm;