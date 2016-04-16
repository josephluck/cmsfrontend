import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';
import { Link } from 'react-router';

import Editor from 'react-quill';

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

      {state.data.fields.map((field, i) => {
        return (
          <div key={i}>
            <FormInput>
              <Editor theme="snow"
                value={field.content}
                onChange={(content) => {
                  onFieldContentType(i, content)
                }}>
                <Editor.Toolbar key="toolbar"
                  ref="toolbar"
                  items={Editor.Toolbar.defaultItems} />
                <div key="editor"
                  ref="editor"
                  className="quill-contents"
                  dangerouslySetInnerHTML={{__html: field.content}} />
              </Editor>
              <div className="clearfix"></div>
            </FormInput>

            {state.data.fields.length !== 1 ?
              <div className="bottom-margin">
                <button className="add-another right-margin bottom-margin"
                  onClick={(e) => {
                    e.preventDefault();
                    removeField(i);
                  }}>
                  {"Remove"}
                </button>
              </div>
              : null
            }

            {i !== state.data.fields.length -1 ?
              null
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
        <button type="submit" className="left-margin">
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