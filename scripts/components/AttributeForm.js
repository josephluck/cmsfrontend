import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

class AttributeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      options: [
        {
          name: "Large",
          value: "large",
          uuid: Date.now()
        }
      ],
      show_options: false,
      new_option: {
        name: "",
        value: ""
      }
    }

    if (props.attributeCurrentlyEditing.options && props.attributeCurrentlyEditing.options.length) {
      this.state.show_options = true;
    }
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
      this.props.onSubmit({
        options: this.state.options,
        ...form_values
      }, this.props.attributeCurrentlyEditing);
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
    let option_index = this.state.options.findIndex(function(opt, i) {
      return opt.uuid === option.uuid
    })

    this.state.options[option_index].editing = true;
    this.forceUpdate();
  }
  handleOptionChange(option, attribute, e) {
    let option_index = this.state.options.findIndex(function(opt, i) {
      return opt.uuid === option.uuid
    })

    this.state.options[option_index][attribute] = e.target.value;
    this.forceUpdate();
  }
  handleSaveOption(option, e) {
    e.preventDefault();
    let option_index = this.state.options.findIndex(function(opt, i) {
      return opt.uuid === option.uuid
    })

    this.state.options[option_index] = option;
    this.state.options[option_index].editing = false;
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
    this.state.options.push(this.state.new_option);
    this.state.new_option = {
      name: "",
      value: ""
    };
    this.forceUpdate();
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
                  <span className="flex-0 list-buttons"></span>
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
                          <input className="flex-1"
                            value={option.name}
                            onChange={this.handleOptionChange.bind(this, option, "name")} />
                          <input className="flex-1"
                            value={option.value}
                            onChange={this.handleOptionChange.bind(this, option, "value")} />
                          <span className="flex-0 list-buttons">
                            <a href=""
                              onClick={this.handleSaveOption.bind(this, option)}>
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
                  <input className="flex-1"
                    type="text"
                    placeholder="Name"
                    value={this.state.new_option.name}
                    onChange={this.handleNewOptionChange.bind(this, "name")} />
                  <input className="flex-1"
                    type="text"
                    placeholder="Value"
                    value={this.state.new_option.value}
                    onChange={this.handleNewOptionChange.bind(this, "value")} />
                  <span className="flex-0 list-buttons">
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