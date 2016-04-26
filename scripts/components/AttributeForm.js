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
          value: "large"
        }
      ],
      show_options: false
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
                </li>
                {this.state.options.map((option, i) => {
                  return (
                    <li className="list-item flex"
                      key={i}>
                      <span className="flex-1">
                        {option.name}
                      </span>
                      <span className="flex-1">
                        {option.value}
                      </span>
                    </li>
                  )
                })}
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