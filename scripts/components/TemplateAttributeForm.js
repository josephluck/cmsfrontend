import React from 'react';
import FormHelper from 'utils/FormHelper';

import FormInput from 'components/FormInput';
import Spreadsheet from 'components/Spreadsheet';

class TemplateAttributeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_options: false,
      options: props.data.options || []
    }

    if (props.data.kind === "dropdown" || props.data.kind === "multi_select") {
      this.state.show_options = true
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
  }

  render() {
    return (
    	<form name="site"
        onSubmit={(e) => {
      		e.preventDefault();
          let form_values = FormHelper.serialize(e.target);
          form_values['options'] = this.state.options;
      		this.props.onSubmit(form_values);
      	}}>

        <FormInput title="Name"
          error={this.props.state.errors.name}>
          <input name="name"
            defaultValue={this.props.data.name}
            type="text" />
        </FormInput>

        <FormInput title="Kind"
          error={this.props.state.errors.kind}>
          <select name="kind"
            defaultValue={this.props.data.kind}
            onChange={this.onKindChange.bind(this)}>
            <option value="text">{"Text input"}</option>
            <option value="dropdown">{"Dropdown"}</option>
            <option value="multi_select">{"Multi select"}</option>
          </select>
        </FormInput>

        {this.state.show_options ?
          <FormInput>
            <Spreadsheet
              addNewRowText="Add another option"
              onChange={this.onOptionsChange.bind(this)}
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
              ]}>
            </Spreadsheet>
          </FormInput>
          : null
        }

        <div className="text-align-right">
    		  <button type="submit">
            {this.state.loading ? "Saving" : "Save"}
          </button>
        </div>
    	</form>
    );
  }
}

TemplateAttributeForm.defaultProps = {
  data: {}
}

export default TemplateAttributeForm;