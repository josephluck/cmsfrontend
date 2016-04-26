import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function TemplateForm({
	state,
  data,
  onSubmit,
  onAddAttribute,
  onEditAttribute,
  onDeleteAttribute
}) {
  if (!data.attributes) {
    data.attributes = [
      {
        name: "Src",
        kind: "Dropdown"
      }
    ]
  }
  return (
  	<form name="template"
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

      <div className="container flex vertical-align">
        <h3 className="flex-1">Attributes</h3>
        <a className="button add-another"
          href=""
          onClick={(e) => {
            e.preventDefault();
            onAddAttribute();
          }}>
          {"New attribute"}
        </a>
      </div>
      <ul className="list form-input">
        {data.attributes.map((attribute, i) => {
          return (
            <li key={i}
              className="list-item flex">
              <span className="flex-2 ellipsis">{attribute.name}</span>
              <span className="flex-1 ellipsis">{attribute.kind}</span>
              <span className="flex-0 list-buttons">
                <a href=""
                  onClick={(e) => {
                    e.preventDefault();
                    onEditAttribute(attribute);
                  }}>
                  {"Edit"}
                </a>
                <a href=""
                  onClick={(e) => {
                    e.preventDefault();
                    onDeleteAttribute(attribute);
                  }}>
                  {"Delete"}
                </a>
              </span>
            </li>
          )
        })}
      </ul>

      <div className="text-align-right">
  		  <button type="submit">
          {state.loading ? "Saving" : "Save"}
        </button>
      </div>
  	</form>
  );
}

TemplateForm.defaultProps = {
  data: {}
}

export default TemplateForm;