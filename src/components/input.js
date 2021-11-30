import { Component } from "react";
import { capitalize } from "../util";
import { FormContext } from "./form";

class Input extends Component {
  labelFormatted() {
    let label = this.props.field.name.replace(/([A-Z])/g, " $1").trim();
    return capitalize(label);
  }

  getValue(form, name) {
    let val;
    form.forEach((group) => {
      group.fields.forEach((field) => {
        if (field.name === name) {
          val = field.value;
        }
      });
    });
    return val;
  }

  setClassControl() {
    if (this.props.field.name === "phoneNumber") {
      return "control flex-grow-0 w-40";
    }
    return "control";
  }

  onChangeHandler(form, handleChange, e) {
    if (form.length !== 0) {
      handleChange(e);
    } else {
      this.props.handleChange(e);
    }
    if (this.props.toggleTimePeriodCompleted) {
      this.props.toggleTimePeriodCompleted();
    }
  }

  render() {
    return (
      <FormContext.Consumer>
        {({ form, handleChange }) => (
          <div className={this.setClassControl()}>
            <label>
              <div className="label-title">
                {this.props.field.labelText
                  ? this.props.field.labelText
                  : this.labelFormatted()}
              </div>
              <input
                type={this.props.field.type}
                name={this.props.field.name}
                onChange={(e) => this.onChangeHandler(form, handleChange, e)}
                value={this.getValue(
                  form.length !== 0 ? form : this.props.form,
                  this.props.field.name
                )}
                placeholder={this.props.field.placeholder}
                checked={this.props.field.labelText}
                required
              />
            </label>
          </div>
        )}
      </FormContext.Consumer>
    );
  }
}

export default Input;
