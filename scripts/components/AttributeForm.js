import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';

class AttributeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {

      }
    }
  }
  onSubmit(e) {
    e.preventDefault();
    let form_values = FormHelper.serialize(e.target);

    if (form_values.title === "") {
      return false
    } else if ((form_values.kind === "dropdown" || form_values.kind === "multi_select") && form_values.options.length === 0) {
      return false
    } else {
      this.props.onSubmit(FormHelper.serialize(e.target), this.props.attribute);
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
              defaultValue={this.props.attribute.title}
              type="text" />
          </FormInput>

          <FormInput title="Kind"
            error={this.state.errors.kind}>
            <select name="kind"
              defaultValue={this.props.attribute.kind}>
              <option value="text">{"Text input"}</option>
              <option value="dropdown">{"Dropdown"}</option>
              <option value="multi_select">{"Multi select"}</option>
            </select>
          </FormInput>
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