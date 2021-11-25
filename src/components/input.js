import { Component } from "react";
import { capitalize } from "../util";
import { FormContext } from "./form";

class Input extends Component {
  labelFormatted() {
    let label = this.props.field.name.replace(/([A-Z])/g, " $1").trim();
    return capitalize(label);
  }

  getValue(form, name) {
    form.find((group) => {
      group.fields.find((field) => {
        if (field.name === name) {
          return field.value;
        }
      });
    });
  }

  render() {
    return (
      <FormContext.Consumer>
        {({ form, handleChange }) => (
          <div
            className={
              this.props.field.name === "phoneNumber"
                ? "control flex-grow-0 w-40"
                : "control"
            }
          >
            <label>
              <div className="label-title">{this.labelFormatted()}</div>
              <input
                type={this.props.field.type}
                name={this.props.field.name}
                onChange={handleChange}
                value={this.getValue(form, this.props.field.name)}
                placeholder={this.props.field.placeholder}
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
