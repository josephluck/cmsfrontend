import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function ItemForm({
	onSubmit,
	state,
  onTitleType,
  addAnotherField,
  removeField,
  onFieldContentType
}) {
  return (
  	<form name="item"
      onSubmit={(e) => {
    		e.preventDefault();
    		onSubmit(state.data.toJS());
    	}}>

      <FormInput title="Title">
        <input name="title"
          type="text"
          defaultValue={state.data.title}
          onChange={(e) => {
            onTitleType(e.target.value);
          }} />
      </FormInput>

      <hr className="container" />

      {state.data.fields.map((field, i) => {
        return (
          <div key={i}>
            <FormInput title="Content">
              <textarea name={`fields[${i}]['content']`}
                defaultValue={field.content}
                onChange={(e) => {
                  onFieldContentType(i, e.target.value)
                }}>
              </textarea>
            </FormInput>

            {state.data.fields.length !== 1 ?
              <button className="add-another right-margin"
                onClick={(e) => {
                  e.preventDefault();
                  removeField(i);
                }}>
                {"Remove"}
              </button>
              : null
            }

            {i !== state.data.fields.length -1 ?
              <hr className="container" />
              :
              <button className="add-another"
                onClick={(e) => {
                  e.preventDefault();
                  addAnotherField();
                }}>
                {"Add another"}
              </button>
            }
          </div>
        );
      })}

      <div className="text-align-right">
  		  <button type="submit">
          {state.loading ? "Saving" : "Save"}
        </button>
      </div>
  	</form>
  );
}

ItemForm.defaultProps = {
  state: {
    data: {
      fields: [{}]
    }
  }
}

export default ItemForm;