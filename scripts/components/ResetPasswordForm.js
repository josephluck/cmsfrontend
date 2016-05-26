import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function ResetPasswordForm({
	onSubmit,
	state,
  data
}) {
  return (
  	<form name="reset_password"
      onSubmit={(e) => {
    		e.preventDefault();
    		onSubmit(FormHelper.serialize(e.target));
    	}}>
      <div className="modal-header">
        <h3>{"Reset password"}</h3>
      </div>
      <div className="container modal-content">

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
      </div>
      <div className="modal-footer container flex vertical-align">
        <div className="flex-1"></div>
        <div className="flex-0">
    		  <button type="submit">
            {state.loading ? "Saving" : "Save"}
          </button>
        </div>
      </div>
  	</form>
  );
}

ResetPasswordForm.defaultProps = {
  data: {}
}

export default ResetPasswordForm;