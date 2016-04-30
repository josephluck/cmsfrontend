import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

function TemplateForm({
	state,
  data,
  onSubmit,
  onNewAttributeButtonClick,
  onEditAttributeButtonClick,
  onDeleteAttributeButtonClick
}) {
  var attributes = state.attributes;

  if (data.attributes.length > 0) {
    attributes = data.attributes;
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
            onNewAttributeButtonClick();
          }}>
          {"New attribute"}
        </a>
      </div>
      <ul className="list form-input">
        {attributes.length ?
          <div>
            <li className="list-header flex">
              <span className="flex-2">
                {"Name"}
              </span>
              <span className="flex-1">
                {"Type"}
              </span>
              <span className="flex-0 list-buttons">
                <span>{"Edit"}</span>
                <span>{"Delete"}</span>
              </span>
            </li>
            {attributes.map((attribute, i) => {
              return (
                <li key={i}
                  className="list-item flex">
                  <span className="flex-2 ellipsis">{attribute.name}</span>
                  <span className="flex-1 ellipsis">
                    {attribute.kind}
                  </span>
                  <span className="flex-0 list-buttons">
                    <a href=""
                      onClick={(e) => {
                        e.preventDefault();
                        onEditAttributeButtonClick(attribute);
                      }}>
                      {"Edit"}
                    </a>
                    <a href=""
                      onClick={(e) => {
                        e.preventDefault();
                        onDeleteAttributeButtonClick(attribute);
                      }}>
                      {"Delete"}
                    </a>
                  </span>
                </li>
              )
            })}
          </div>
          : <li className="list-item">{"No attributes saved yet"}</li>
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

TemplateForm.defaultProps = {
  data: {
    attributes: []
  }
}

export default TemplateForm;