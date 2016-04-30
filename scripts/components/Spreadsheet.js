import React from 'react';
import * as _ from 'underscore';
import FormHelper from 'utils/FormHelper';
import FormInput from 'components/FormInput';

class AttributeForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rows: this.generateRows(props.data, props.input_models),
			models: props.input_models
		}
	}

	componentWillReceiveProps(props) {
		console.log(props);
		this.setState({
			rows: this.generateRows(props.data, props.input_models)
		})
	}

	generateRows(rows, models) {
		return rows.map((row, i) => {
	    var spreadsheet_row = {
	      row_index: i,
	      column: models.map((model, x) => {
	        var cell = _.clone(model);

	        cell["column_index"] = x;
	        cell["value"] = row[cell.name];

	        return cell;
	      })
	    };
	    return spreadsheet_row;
		});
	}

	generateEmptyRow(models) {
	  return {
	    column: models.map((model, i) => {
	      var cell = _.clone(model);
	      cell["column_index"] = i;

	      return cell;
	    })
	  };
	};

	updateSpreadsheetRowIndexes(rows) {
	  return _.map(rows, function(row, i) {
	  	row.row_index = i
	  	return row
	  });
	};

	addNewRow() {
		this.state.rows.push(this.generateEmptyRow(this.state.models));
		this.state.rows = this.updateSpreadsheetRowIndexes(this.state.rows);
		this.forceUpdate();
	}

	removeRow(row_index) {
		this.state.rows.splice(row_index, 1);
		this.state.rows = this.updateSpreadsheetRowIndexes(this.state.rows);
		this.forceUpdate();
	}

	handleInputChange(cell, e) {
		let value = e.target.value;

		cell.value = value;
		this.forceUpdate();
	}

	render() {
		return (
			<div className="spreadsheet">
				{this.state.rows.map((row, i) => {
					return (
						<div className="flex spreadsheet-row"
							key={i}>
							{row.column.map((cell, x) => {
								return (
									<div className="flex-1 spreadsheet-cell"
										key={x}>
										<div className="form-input">
										  <input name={cell.name}
										    value={cell.value || ""}
										    onChange={this.handleInputChange.bind(this, cell)}
										    type="text" />
										</div>
									</div>
								)
							})}
							<a className="spreadsheet-delete-link"
								tabindex="-1"
								onClick={this.removeRow.bind(this, i)}>
								<span className="ss-delete"></span>
							</a>
						</div>
					)
				})}
				<div className="add-new-row"
					onClick={this.addNewRow.bind(this)}>
					{"Add a new row"}
				</div>
			</div>
		)
	}
}

AttributeForm.defaultProps = {
	data: [],
	input_models: []
}

export default AttributeForm;



// Spreadsheet.prototype.handleRemoveRow = function(e) {
//   var row_index;
//   row_index = parseInt(e.target.dataset.rowIndex);
//   this.rows.splice(row_index, 1);
//   this.updateSpreadsheetRowIndexes();
//   return this.render();
// };

// Spreadsheet.prototype.handleAddNewRow = function(e) {
//   this.rows.push(this.generateEmptyRow());
//   this.updateSpreadsheetRowIndexes();
//   this.render();
//   this.last_row = this.el.querySelectorAll('.existing-row')[this.rows.length - 1];
//   return this.last_row.querySelector('input').focus();
// };

// Spreadsheet.prototype.updateSpreadsheetRowIndexes = function() {
//   return _.each(this.rows, (function(_this) {
//     return function(row, i) {
//       return row.row_index = i;
//     };
//   })(this));
// };

// Spreadsheet.prototype.generateFormData = function() {
//   debugger;
// };

// Spreadsheet.prototype.generateSpreadsheetRowsForTheFirstTime = function() {
//   var spreadsheet_rows;
//   spreadsheet_rows = _.map(this.data, (function(_this) {
//     return function(row, i) {
//       var spreadsheet_row;
//       spreadsheet_row = {
//         row_index: i,
//         column: _.map(_this.input_models, function(model, x) {
//           var cell;
//           cell = _.clone(model);
//           cell["column_index"] = x;
//           cell["value"] = row[cell.name];
//           if (cell.value === "200") {
//             cell.value = 4;
//           }
//           return cell;
//         })
//       };
//       return spreadsheet_row;
//     };
//   })(this));
//   return spreadsheet_rows;
// };

// Spreadsheet.prototype.generateEmptyRow = function() {
//   var spreadsheet_row;
//   spreadsheet_row = {
//     row_index: this.rows.length,
//     column: _.map(this.input_models, function(model, i) {
//       var cell;
//       cell = _.clone(model);
//       cell["column_index"] = i;
//       return cell;
//     })
//   };
//   return spreadsheet_row;
// };