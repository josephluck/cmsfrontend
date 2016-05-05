import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function SectionForm({
	onSubmit,
	state,
  data
}) {
  var items = state.items;

  if (data.items.length > 0) {
    items = data.items;
  }

  return (
  	<form name="section"
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

      <div className="container flex vertical-align">
        <h3 className="flex-1">Items</h3>
        <a className="button add-another"
          href=""
          onClick={(e) => {
            e.preventDefault();
            onNewItemButtonClick();
          }}>
          {"New item"}
        </a>
      </div>

      <ul className="list form-input">
        {items.length ?
          <div>
            {items.map((item) => {
              return (
                <li className="list-item flex">
                  <span className="flex-1 ellipsis">
                    {item.title}
                  </span>
                </li>
              )
            })}
          </div>
          :
          <li className="list-item">{"No items saved yet"}</li>
        }
      </ul>

      <div className="text-align-right">
  		  <button type="submit">
          {state.loading ? "Saving" : "Save"}
        </button>
      </div>
  	</form>
  );
}

SectionForm.defaultProps = {
  data: {
    items: []
  }
}

export default SectionForm;