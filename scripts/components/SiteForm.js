import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function SiteForm({
	onSubmit,
	state,
  data
}) {
  return (
  	<form name="site"
      onSubmit={(e) => {
    		e.preventDefault();
    		onSubmit(FormHelper.serialize(e.target));
    	}}>

      <FormInput title="Title"
        error={state.errors.title}>
        <input name="title"
          defaultValue={data.title}
          type="text" />
      </FormInput>

      <div className="text-align-right">
  		  <button type="submit">
          {state.loading ? "Saving" : "Save"}
        </button>
      </div>
  	</form>
  );
}

SiteForm.defaultProps = {
  data: {}
}

export default SiteForm;