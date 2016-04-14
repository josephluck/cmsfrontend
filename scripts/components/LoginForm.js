import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';
import ErrorBar from 'components/ErrorBar';

function LoginForm({
	onSubmit,
	state
}) {
  console.log(state);
  return (
    <div>
      {state.errors ?
        <ErrorBar text={state.errors}></ErrorBar>
        : null
      }
    	<form name="login"
        onSubmit={(e) => {
      		e.preventDefault();
      		onSubmit(FormHelper.serialize(e.target));
      	}}>

        <FormInput title="Email">
          <input name="email"
            type="text" />
        </FormInput>

        <FormInput title="Password">
          <input name="password"
            type="password" />
        </FormInput>

        <div className="container flex vertical-align">
          <div className="flex-1">
            <span>
              {"Don't have an account yet? "}
            </span>
            <a href="/">
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
    </div>
  );
}

export default LoginForm;