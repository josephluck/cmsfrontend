


/* ==========================

Need to store options in a
new database table with a
schems since right now it's
storing errors: {} in the DB

Also, having options in DB
table means that edit will work
without butchering with forced
uuids in the front-end

========================== */






import React from 'react';
import FormHelper from 'utils/FormHelper';
import FormInput from 'components/FormInput';
import Spreadsheet from 'components/Spreadsheet';

class AttributeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      options: props.attributeCurrentlyEditing.options || [],
      show_options: false
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

  onOptionsChange(options) {
    this.state.options = options;
    this.forceUpdate();
  }

  onSubmit(e) {
    e.preventDefault();
    let form_values = FormHelper.serialize(e.target);
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
          <FormInput title="Name"
            error={this.state.errors.name}>
            <input name="name"
              defaultValue={this.props.attributeCurrentlyEditing.name}
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

          <Spreadsheet
            data={this.state.options}
            input_models={[
              {
                type: 'input',
                name: 'name',
                label: 'Option name',
                required: true
              },
              {
                type: 'input',
                name: 'value',
                label: 'Option value',
                required: true
              }
            ]}
            onChange={this.onOptionsChange.bind(this)} />
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
