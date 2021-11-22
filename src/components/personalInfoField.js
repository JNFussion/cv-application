import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { capitalize } from "../util";

class PersonalInfoField extends Component {
  labelFormatted() {
    let label = this.props.type.name.replace(/([A-Z])/g, " $1").trim();
    return capitalize(label);
  }
  render() {
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

export default PersonalInfoField;
