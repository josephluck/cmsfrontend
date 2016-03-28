import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';
import {Link} from 'react-router';

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

        <div className="container flex vertical-align">
          <div className="flex-1">
            <span>
              {"Already have an account? "}
            </span>
            <Link to="login">
              {"Login"}
            </Link>
          </div>
          <div class="flex-0">
            <button type="submit">
              {state.loading ? "Registering" : "Register"}
            </button>
          </div>
        </div>
  	</form>
  );
}

export default RegisterForm;