import React from 'react';
import FormHelper from 'utils/FormHelper';
import * as _ from 'underscore';

import { Link } from 'react-router';
import Editor from 'react-medium-editor';
import FormInput from 'components/FormInput';
import Reorder from 'react-reorder';

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

    item['fields'] = this.state.fields.map((field, i) => {
      return {
        ...field,
        id: null
      }
    });

    this.props.onSubmit(item);
  }

  handleRemoveField(field_index) {
    this.state.fields.splice(field_index, 1);
    this.forceUpdate();
  }

  handleFieldAttributeChange(attribute, e) {
    let value = e.target.value;
    attribute.value = value;
    this.forceUpdate();
  }

  addField(selected_template) {
    selected_template.attributes = selected_template.attributes.map((attribute, i) => {
      return {
        ...attribute,
        field_template_attribute_id: attribute.id
      }
    })
    this.state.fields.push({
      ...selected_template,
      id: Date.now(),
      field_template_id: selected_template.id
    });
    this.forceUpdate();
  }

  handleReorder(e, moved_item, item_prev_index, item_new_index, fields) {
    this.state.fields = fields;
    this.forceUpdate();
  }

  handleEditorChange(value) {
    this.setState({
      editor_value: value
    })
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

            <Editor
              tag="div"
              text={this.state.editor_value}
              onChange={::this.handleEditorChange}
              options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
            />

            <FormInput title="Title">
              <input name="title"
                type="text"
                defaultValue={this.state.data.title} />
            </FormInput>

            <Reorder
              itemKey='id'
              lock='horizontal'
              holdTime='100'
              list={this.state.fields}
              template={({item}) => {
                var field = item;
                var minimise_icon_class = "minimise-icon ss-navigateright rotated";
                if (field.open) {
                  minimise_icon_class = "minimise-icon ss-navigateright";
                }
                return (
                  <div className="form-item-group">
                    <span className="form-input-group-title sortable-handle flex vertical-align">
                      <span className="flex-1">
                        <a href=""
                          className={minimise_icon_class}
                          onClick={(e) => {
                            e.preventDefault();
                            this.state.fields[field_index].open = !this.state.fields[field_index].open;
                            this.forceUpdate();
                          }}></a>
                        <span className="left-margin">
                          {field.title}
                        </span>
                      </span>
                      <a href=""
                        onClick={(e) => {
                          e.preventDefault();
                          this.handleRemoveField(field_index)
                        }}>
                        {"Remove"}
                      </a>
                    </span>
                    {!field.open ?
                      <div key={field_index}
                        className="form-input-group-content relative">
                        <input type="hidden" value={field.field_template_id} />
                        {field.attributes.map((attribute, attribute_index) => {
                          if (attribute.kind === "single_line_text") {
                            return (
                              <FormInput key={attribute_index}
                                title={attribute.name}>
                                <input type="text"
                                  value={attribute.value}
                                  onChange={this.handleFieldAttributeChange.bind(this, attribute)} />
                              </FormInput>
                            )
                          } else if (attribute.kind === "rich_text") {
                            return (
                              <FormInput key={attribute_index}
                                title={attribute.name}>
                                <Editor
                                  tag="div"
                                  text={attribute.value}
                                  onChange={this.handleFieldAttributeChange.bind(this, attribute)}
                                  options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
                                />
                              </FormInput>
                            )
                          } else if (attribute.kind === "dropdown") {

                          } else if (attribute.kind === "multi_select") {
                            return (
                              <FormInput key={attribute_index}
                                title={attribute.name}>
                                <select value={attribute.value}
                                  onChange={this.handleFieldAttributeChange.bind(this, attribute)}>
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
                        <div className="clearfix"></div>
                      </div>
                      : null
                    }
                  </div>
                )
              }}
              callback={::this.handleReorder}
              listClass='list'
              itemClass='flex list-item'
              selectedKey='id'
              disableReorder={false}>
            </Reorder>
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
          <div className="aside-header flex flex-0">
            <span className="flex-1">
              {"Templates"}
            </span>
            <Link to="/templates/new">
              {"New template"}
            </Link>
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
