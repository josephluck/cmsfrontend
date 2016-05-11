import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';
import { Link } from 'react-router';

import Editor from 'react-quill';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  onSubmit(e) {
    debugger
    this.props.onSubmit(this.state.data.toJS());
  }

  onSelectedTemplateChange(e) {
    console.log(e.target.value);
    debugger
  }

  render() {
    console.log(this.props.templates);
    return (
      <form name="item"
        onSubmit={(e) => {
          e.preventDefault();
          this.onSubmit(e);
        }}>

        <FormInput title="Template">
          <select name="selected_template"
            onChange={(e) => {
              this.onSelectedTemplateChange(e);
            }}>
            {this.props.templates.map((template) => {
              return (
                <option value={template.id}>
                  {template.title}
                </option>
              )
            })}
          </select>
        </FormInput>

        <FormInput title="Title">
          <input name="title"
            type="text"
            defaultValue={this.state.data.title} />
        </FormInput>


        <FormInput>
          <Editor theme="snow"
            value="">
            <Editor.Toolbar key="toolbar"
              ref="toolbar"
              items={Editor.Toolbar.defaultItems} />
            <div key="editor"
              ref="editor"
              className="quill-contents"
              dangerouslySetInnerHTML={{__html: "blah"}} />
          </Editor>
          <div className="clearfix"></div>
        </FormInput>

        <div className="text-align-right">
          <button type="submit" className="left-margin">
            {this.props.loading ? "Saving" : "Save"}
          </button>
        </div>
      </form>
    );
  }
}

ItemForm.defaultProps = {
  state: {
    data: {
      fields: []
    }
  }
}

export default ItemForm;