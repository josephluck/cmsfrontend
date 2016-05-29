import React from 'react';
import FormHelper from 'utils/FormHelper';
import * as _ from 'underscore';

import FormInput from 'components/FormInput';
import { Link } from 'react-router';

import Editor from 'react-quill';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    if (props.data) {
      let selected_template =  _.findWhere(props.templates, {id: parseInt(props.data.field_template_id)});

      this.state = {
        data: props.data,
        fields: props.data.fields,
        selected_template: selected_template
      }
    } else {
      this.state = {
        data: {},
        fields: []
      }
    }
  }

  onSubmit(e) {
    var item = FormHelper.serialize(e.target)

    item['fields'] = this.state.fields;
    this.props.onSubmit(item);
  }

  onSelectedTemplateChange(e) {
    let selected_template = _.findWhere(this.props.templates, {id: parseInt(e.target.value)});

    this.setState({
      selected_template: selected_template,
      fields: [{}] // At this state, we can place default values for the field (only if the attribute has a default value)
    })
  }

  handleAddAnother(e) {
    e.preventDefault();
    this.state.fields.push({});
    this.forceUpdate();
  }

  handleRemoveField(field_index) {
    this.state.fields.splice(field_index, 1);
    this.forceUpdate();
  }

  handleFieldAttributeChange(attribute, field_index, e) {
    let value = e.target.value;
    this.state.fields[field_index][attribute.name] = value;
    this.forceUpdate();
  }

  addField(selected_template) {
    this.state.fields.push({
      id: Date.now(),
      ...selected_template
    });
    this.forceUpdate();
  }

  render() {
    return (
      <div className="flex flex-1">
        <form className="flex-2 flex overflow-auto"
          name="item"
          onSubmit={(e) => {
            e.preventDefault();
            this.onSubmit(e);
          }}>
          <div className="flex-1 container">
            <FormInput title="Title">
              <input name="title"
                type="text"
                defaultValue={this.state.data.title} />
            </FormInput>

            {this.state.fields.map((field, field_index) => {
              return (
                <div className="form-input-group">
                  <span className="form-input-group-title flex">
                    <span className="flex-1">
                      {field.title}
                    </span>
                    <a href=""
                      onClick={(e) => {
                        e.preventDefault();
                        this.handleRemoveField(field_index)
                      }}>
                      {"Remove"}
                    </a>
                  </span>
                  <div key={field_index}
                    className="form-input-group-content relative">
                    {field.attributes.map((attribute, attribute_index) => {
                      if (attribute.kind === "text") {
                        return (
                          <FormInput key={attribute_index}
                            title={attribute.name}>
                            <input type="text"
                              value={field[attribute.name]}
                              onChange={this.handleFieldAttributeChange.bind(this, attribute, field_index)} />
                          </FormInput>
                        )
                      } else {
                        return (
                          <FormInput key={attribute_index}
                            title={attribute.name}>
                            <select value={field[attribute.name]}
                              onChange={this.handleFieldAttributeChange.bind(this, attribute, field_index)}>
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
                </div>
              )
            })}
            <div className="flex">
              <div className="flex-1">
                {this.state.selected_template ?
                  <button className="add-another"
                    onClick={this.handleAddAnother.bind(this)}>
                    {"Add another "} {this.state.selected_template.title.toLowerCase()}
                  </button>
                  : null
                }
              </div>
              <button type="submit" className="left-margin">
                {this.props.state.loading ? "Saving" : "Save"}
              </button>
            </div>
          </div>
        </form>
        <div className="flex-1 aside flex flex-vertical">
          <div className="aside-header">
            {"Templates"}
          </div>
          <div className="list without-border flex-1 overflow-auto">
            {this.props.templates.map((template, i) => {
              return (
                <div key={i}
                  value={template.id}
                  className="list-item flex with-bottom-border">
                  <span className="flex-1">
                    {template.title}
                  </span>
                  <a href="" onClick={(e) => {
                    e.preventDefault();
                    this.addField(template);
                  }}>
                    {"Use"}
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>
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




// <Editor theme="snow"
//   value="">
//   <Editor.Toolbar key="toolbar"
//     ref="toolbar"
//     items={Editor.Toolbar.defaultItems} />
//   <div key="editor"
//     ref="editor"
//     className="quill-contents"
//     dangerouslySetInnerHTML={{__html: "blah"}} />
// </Editor>
// <div className="clearfix"></div>
