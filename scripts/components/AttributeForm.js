import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

class AttributeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      options: props.attributeCurrentlyEditing.options || [],
      show_options: false,
      new_option: {
        name: "",
        value: "",
        errors: {}
      }
    }

    if (props.attributeCurrentlyEditing.options && props.attributeCurrentlyEditing.options.length > 0) {
      this.state.show_options = true;
    }
  }
  onKindChange(e) {
    if (e.target.value === "dropdown" || e.target.value === "multi_select") {
      this.setState({
        show_options: true
      })
    } else {
      this.setState({
        show_options: false
      })
    }
  }
  handleEditOption(option, e) {
    e.preventDefault();
    e.persist();
    let option_index = this.state.options.findIndex(function(opt, i) {
      return opt.uuid === option.uuid
    })

    this.state.options[option_index].editing = true;
    this.forceUpdate();

    setTimeout(() => {
      let input = e.target.parentElement.parentElement.parentElement.querySelector('input');
      input.focus();
    }, 10);
  }
  handleEditOptionInputChange(option, attribute, e) {
    let option_index = this.state.options.findIndex(function(opt, i) {
      return opt.uuid === option.uuid
    })

    this.state.options[option_index][attribute] = e.target.value;
    this.forceUpdate();
  }
  handleEditSaveOption(option, e) {
    e.preventDefault();
    let option_index = this.state.options.findIndex(function(opt, i) {
      return opt.uuid === option.uuid
    })

    if (option.value.length > 0) {
      this.state.options[option_index].errors["value"] = undefined
    } else {
      this.state.options[option_index].errors["value"] = "Please enter a value";
    }

    if (option.name.length > 0) {
      this.state.options[option_index].errors["name"] = undefined
    } else {
      this.state.options[option_index].errors["name"] = "Please enter a name";
    }

    if (option.name.length > 0 && option.value.length > 0) {
      this.state.options[option_index] = option;
      this.state.options[option_index].editing = false;
    }

    this.forceUpdate();
  }
  handleDeleteOption(option, e) {
    e.preventDefault();
    let option_index = this.state.options.findIndex(function(opt, i) {
      return opt.uuid === option.uuid
    })

    this.state.options.splice(option_index, 1)
    this.forceUpdate();
  }
  handleNewOptionChange(attribute, e) {
    this.state.new_option[attribute] = e.target.value;
    this.forceUpdate();
  }
  handleAddNewOption(e) {
    e.preventDefault();

    if (this.state.new_option.value.length > 0) {
      this.state.new_option.errors["value"] = undefined;
    } else {
      this.state.new_option.errors["value"] = "Please enter a value";
    }

    if (this.state.new_option.name.length > 0) {
      this.state.new_option.errors["name"] = undefined;
    } else {
      this.state.new_option.errors["name"] = "Please enter a name";
    }

    if (this.state.new_option.name.length > 0 && this.state.new_option.value.length > 0) {
      this.state.options.push(this.state.new_option);
      this.state.new_option = {
        name: "",
        value: "",
        uuid: Date.now(),
        errors: {}
      }
    }

    this.forceUpdate();
  }
  onSubmit(e) {
    e.preventDefault();
    let form_values = FormHelper.serialize(e.target);

    this.state.errors = {};

    if (form_values.title === "") {
      this.state.errors["title"] = "can't be blank";
      this.forceUpdate();
      return false
    } else if ((form_values.kind === "dropdown" || form_values.kind === "multi_select") && this.state.options.length === 0) {
      this.state.errors["options"] = "Please enter at least one option";
      this.forceUpdate();
      return false
    } else {
      this.handleAddNewOption(e);
      let form = {
        options: this.state.options,
        uuid: Date.now(),
        ...form_values
      }
      this.props.onSubmit(form, this.props.attributeCurrentlyEditing);
    }
  }
  render() {
    return (
      <form className="modal"
        name="attribute"
        onSubmit={this.onSubmit.bind(this)}>
        <div className="modal-header">
          <h3>{this.props.title}</h3>
        </div>
        <div className="container modal-content">
          <FormInput title="Title"
            error={this.state.errors.title}>
            <input name="title"
              defaultValue={this.props.attributeCurrentlyEditing.title}
              type="text" />
          </FormInput>

          <FormInput title="Kind"
            error={this.state.errors.kind}>
            <select name="kind"
              defaultValue={this.props.attributeCurrentlyEditing.kind}
              onChange={this.onKindChange.bind(this)}>
              <option value="text">{"Text input"}</option>
              <option value="dropdown">{"Dropdown"}</option>
              <option value="multi_select">{"Multi select"}</option>
            </select>
          </FormInput>

          {this.state.show_options === true ?
            <div>
              <span className="form-input-label">{"Options"}</span>
              <ul className="list">
                <li className="list-header flex">
                  <span className="flex-1">{"Name"}</span>
                  <span className="flex-1">{"Value"}</span>
                  <span className="flex-0 list-buttons">
                    <span>{"Edit"}</span>
                    <span>{"Delete"}</span>
                  </span>
                </li>
                {this.state.options.map((option, i) => {
                  return (
                    <li className="list-item flex"
                      key={i}>
                      {option.editing !== true ?
                        <span className="flex">
                          <span className="flex-1">
                            {option.name}
                          </span>
                          <span className="flex-1">
                            {option.value}
                          </span>
                          <span className="flex-0 list-buttons">
                            <a href=""
                              onClick={this.handleEditOption.bind(this, option)}>
                              {"Edit"}
                            </a>
                            <a href=""
                              onClick={this.handleDeleteOption.bind(this, option)}>
                              {"Delete"}
                            </a>
                          </span>
                        </span>
                        :
                        <span className="flex">
                          <div className="inline-edit-wrapper flex-1">
                            <FormInput error={option.errors.name}>
                              <input value={option.name}
                                onChange={this.handleEditOptionInputChange.bind(this, option, "name")} />
                            </FormInput>
                          </div>
                          <div className="inline-edit-wrapper flex-1">
                            <div class="form-input">
                              <FormInput error={option.errors.value}>
                                <input value={option.value}
                                  onChange={this.handleEditOptionInputChange.bind(this, option, "value")} />
                              </FormInput>
                            </div>
                          </div>
                          <span className="flex-0 list-buttons">
                            <a href=""
                              onClick={this.handleEditSaveOption.bind(this, option)}>
                              {"Save"}
                            </a>
                            <a href=""
                              onClick={this.handleDeleteOption.bind(this, option)}>
                              {"Delete"}
                            </a>
                          </span>
                        </span>
                      }
                    </li>
                  )
                })}
                <li className="list-item flex">
                  <div className="inline-edit-wrapper flex-1">
                    <FormInput error={this.state.new_option.errors.name}>
                      <input type="text"
                        placeholder="Name"
                        value={this.state.new_option.name}
                        onChange={this.handleNewOptionChange.bind(this, "name")} />
                    </FormInput>
                  </div>
                  <div className="inline-edit-wrapper flex-1">
                    <FormInput error={this.state.new_option.errors.value}>
                      <input type="text"
                        placeholder="Value"
                        value={this.state.new_option.value}
                        onChange={this.handleNewOptionChange.bind(this, "value")} />
                    </FormInput>
                  </div>
                  <span className="flex-0 list-buttons">
                    <a className="invisible">
                      {"Delete"}
                    </a>
                    <a href=""
                      onClick={this.handleAddNewOption.bind(this)}>
                      {"Save"}
                    </a>
                  </span>
                </li>
              </ul>
            </div>
            : null
          }
        </div>
        <div className="modal-footer container text-align-right">
          <a href="" onClick={(e) => {
            e.preventDefault();
            this.props.onCancel();
          }}>
            {"Cancel"}
          </a>
          <button type="submit">
            {"Save"}
          </button>
        </div>
      </form>
    )
  }
}

AttributeForm.defaultProps = {
  data: {}
}

export default AttributeForm;