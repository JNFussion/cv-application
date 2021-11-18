import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";

class PersonalInfoField extends Component {
  labelFormatted() {
    let label = this.props.type.name.replace(/([A-Z])/g, " $1").trim();
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
  render() {
    if (this.props.isEditing) {
      return (
        <div
          className={
            this.props.type.name === "phoneNumber"
              ? "control flex-grow-0 w-40"
              : "control"
          }
        >
          <label>
            <div className="label-title">{this.labelFormatted()}</div>
            <input
              type="text"
              name={this.props.type.name}
              onChange={this.props.changeHandler}
              value={this.props.type.value}
              placeholder={this.props.type.placeholder}
              required
            />
          </label>
        </div>
      );
    } else {
      if (this.props.IsContact) {
        return (
          <li>
            <span className="fa-li text-gray-500">
              <FontAwesomeIcon icon={this.props.iconName} />
            </span>
            <span className="align-top">{this.props.text}</span>
          </li>
        );
      } else {
        return <span>{this.props.text}</span>;
      }
    }
  }
}

export default PersonalInfoField;
