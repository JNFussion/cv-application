import { Component } from "react";

class PersonalInfoField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        phoneNumber: "",
        email: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  labelFormatted() {
    let label = this.props.type.name.replace(/([A-Z])/g, " $1").trim();
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  handleChange(e) {
    this.setState((prevState) => ({
      formValues: {
        ...prevState.formValues,
        [e.target.name]: e.target.value,
      },
    }));
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
              onChange={this.handleChange}
              value={this.state.formValues[this.props.type.name]}
              placeholder={this.props.type.placeholder}
            />
          </label>
        </div>
      );
    } else {
      if (this.props.IsContact) {
        return <li>{this.props.text}</li>;
      } else {
        return <span>{this.props.text}</span>;
      }
    }
  }
}

export default PersonalInfoField;
