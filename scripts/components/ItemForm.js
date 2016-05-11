import React from 'react';
import FormHelper from 'utils/FormHelper';
import * as _ from 'underscore';

import FormInput from 'components/FormInput';
import { Link } from 'react-router';

import Editor from 'react-quill';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      fields: []
    }
  }

  onSubmit(e) {
    debugger
    this.props.onSubmit(this.state.data.toJS());
  }

  onSelectedTemplateChange(e) {
    let selected_template = _.findWhere(this.props.templates, {id: parseInt(e.target.value)});

    this.setState({
      selected_template: selected_template,
      fields: [{}]
    })
  }

  render() {
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
            <option disabled selected>Please select a template</option>
            {this.props.templates.map((template, i) => {
              return (
                <option key={i}
                  value={template.id}>
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

        {this.state.selected_template ?
          <div>
            {this.state.fields.map((field, field_index) => {
              return (
                <div key={field_index}>
                  {this.state.selected_template.attributes.map((attribute, attribute_index) => {
                    if (attribute.kind === "text") {
                      return (
                        <FormInput key={attribute_index}
                          title={attribute.name}>
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
                      )
                    } else {
                      return (
                        <FormInput key={attribute_index}
                          title={attribute.name}>
                          <select>
                            {attribute.options.map((option, option_index) => {
                              return (
                                <option key={option_index}
                                  value={option.value}>
                                  {option.name}
                                </option>
                              )
                            })}
                          </select>
                        </FormInput>
                      )
                    }
                  })}
                </div>
              )
            })}
          </div>
          : null
        }

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