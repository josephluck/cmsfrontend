import React from 'react';
import * as _ from 'underscore';
import FormHelper from 'utils/FormHelper';
import FormInput from 'components/FormInput';

class Spreadsheet extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			rows: this.generateRows(props.data, props.input_models),
			models: props.input_models
		}

		if (!this.state.rows.length) {
			this.state.rows.push(this.generateEmptyRow(this.state.models))
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			rows: this.generateRows(props.data, props.input_models)
		})
	}

	generateRows(rows, models) {
		return rows.map((row, i) => {
	    return {
	      cells: models.map((model, x) => {
	        var cell = _.clone(model);
	        cell["value"] = row[cell.name];
	        return cell;
	      })
	    };
		});
	}

	generateEmptyRow(models) {
	  return {
	    cells: models.map((model, i) => {
	      var cell = _.clone(model);
	      return cell;
	    })
	  };
	};

	prepareRowsForParent(rows, models) {
		let decorated_rows = [];
		for (let row of rows) {
			let row_valid = true;
			let decorated_row = {};

			for (let cell of row.cells) {
				if (cell.required && !cell.value) {
					row_valid = false;
				} else {
					decorated_row[cell.name] = cell.value
				}
			}

			if (row_valid) {
				decorated_rows.push(decorated_row);
			}
		}

		// for (let row of rows) {
		// 	let row_valid = true;
		// 	let decorated_row = {};

		// 	for (let cell of row.cells) {
		// 		if (cell.required && !cell.value) {
		// 			row_valid = false;
		// 		}
		// 	}

		// 	if (row_valid) {
		// 		decorated_rows.push(row.cells[1].value);
		// 	}
		// }

		console.log(decorated_rows);
		return decorated_rows;
	};

	addNewRow() {
		this.state.rows.push(this.generateEmptyRow(this.state.models));
		this.forceUpdate();
	}

	removeRow(row_index) {
		this.state.rows.splice(row_index, 1);
		this.forceUpdate();
	}

	handleInputChange(cell, e) {
		cell.value = e.target.value;
		this.forceUpdate();

		this.props.onChange(this.prepareRowsForParent(this.state.rows, this.state.models));
	}

	render() {
		return (
			<div className="spreadsheet">
				<div className="spreadsheet-input-labels flex">
					{this.state.models.map((model, i) => {
						return (
							<div className="flex-1 form-input-label"
								key={i}>
								{model.label}
							</div>
						)
					})}
				</div>
				<div className="spreadsheet-rows">
					{this.state.rows.map((row, i) => {
						return (
							<div className="flex spreadsheet-row"
								key={i}>
								{row.cells.map((cell, x) => {
									return (
										<div className="flex-1 spreadsheet-cell"
											key={x}>
											<div className="form-input">
											  <input name={cell.name}
											  	className="spreadsheet-input"
											    value={cell.value || ""}
											    onChange={this.handleInputChange.bind(this, cell)}
											    type="text" />
											</div>
										</div>
									)
								})}
								{this.state.rows.length > 1 ?
									<a className="spreadsheet-delete-link"
										tabindex="-1"
										onClick={this.removeRow.bind(this, i)}>
										<span className="ss-delete"></span>
									</a>
									:
									<a className="spreadsheet-delete-link invisible"
										tabindex="-1">
										<span className="ss-delete"></span>
									</a>
								}
							</div>
						)
					})}
				</div>
				<div className="add-new-row"
					onClick={this.addNewRow.bind(this)}>
					{this.props.addNewRowText || "Add a new row"}
				</div>
			</div>
		)
	}
}

Spreadsheet.defaultProps = {
	data: [],
	input_models: []
}

export default Spreadsheet;