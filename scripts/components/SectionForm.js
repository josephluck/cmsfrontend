import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function SectionForm({
	onSubmit,
	state,
  data
}) {
  return (
  	<form name="page"
      onSubmit={(e) => {
    		e.preventDefault();
    		onSubmit(FormHelper.serialize(e.target));
    	}}>

      <FormInput title="Section title"
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

SectionForm.defaultProps = {
  data: {}
}

export default SectionForm;