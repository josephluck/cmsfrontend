import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function UserForm({
	onSubmit,
	state,
  data
}) {
  return (
  	<form name="page"
      onSubmit={(e) => {
    		e.preventDefault();
        console.log(FormHelper.serialize(e.target));
    		onSubmit(FormHelper.serialize(e.target));
    	}}>

      <FormInput title="Email"
        error={state.errors.email}>
        <input name="email"
          defaultValue={data.email}
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
          {state.loading ? "Saving" : "Save"}
        </button>
      </div>
  	</form>
  );
}

UserForm.defaultProps = {
  data: {}
}

export default UserForm;