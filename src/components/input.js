import { Component } from "react";
import { capitalize } from "../util";

class Input extends Component {
  labelFormatted() {
    let label = this.props.field.name.replace(/([A-Z])/g, " $1").trim();
    return capitalize(label);
  }

  render() {
    return (
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
            onChange={this.props.changeHandler}
            value={this.props.field.value}
            placeholder={this.props.field.placeholder}
            required
          />
        </label>
      </div>
    );
  }
}

export default Input;
