import { Component } from "react";
import PersonalInfoField from "./personalInfoField";

class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: {
        name: "firstName",
        placeholder: "John",
        value: this.props.personalInfo.firstName,
      },
      lastName: {
        name: "lastName",
        placeholder: "Doe",
        value: this.props.personalInfo.lastName,
      },
      city: {
        name: "city",
        placeholder: "Madrid",
        value: this.props.personalInfo.location.city,
      },
      country: {
        name: "country",
        placeholder: "Spain",
        value: this.props.personalInfo.location.country,
      },
      phoneNumber: {
        name: "phoneNumber",
        value: this.props.personalInfo.contact.phoneNumber,
      },
      email: {
        name: "email",
        placeholder: "johnDoe@example.com",
        value: this.props.personalInfo.contact.email,
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState((prevState) => ({
      [e.target.name]: {
        ...prevState[e.target.name],
        value: e.target.value,
      },
    }));
  }

  render() {
    return (
      <form
        action="#"
        onSubmit={this.props.submitHandler}
        className="personal-info-container"
      >
        <fieldset>
          <legend className="font-extrabold">Personal Info.</legend>

          <fieldset className="group-control field-container">
            <legend>Full Name</legend>
            <PersonalInfoField
              changeHandler={this.handleChange}
              type={this.state.firstName}
              isEditing={true}
            />
            <PersonalInfoField
              changeHandler={this.handleChange}
              type={this.state.lastName}
              isEditing={true}
            />
          </fieldset>
          <fieldset className="group-control field-container">
            <legend>Current Location</legend>
            <PersonalInfoField
              changeHandler={this.handleChange}
              type={this.state.city}
              isEditing={true}
            />
            <PersonalInfoField
              changeHandler={this.handleChange}
              type={this.state.country}
              isEditing={true}
            />
          </fieldset>
          <fieldset className="group-control field-container">
            <legend>Contact</legend>
            <PersonalInfoField
              changeHandler={this.handleChange}
              type={this.state.phoneNumber}
              isEditing={true}
            />
            <PersonalInfoField
              changeHandler={this.handleChange}
              type={this.state.email}
              isEditing={true}
            />
          </fieldset>
        </fieldset>

        <button type="submit" className="btn-submit transition-state">
          Save
        </button>
      </form>
    );
  }
}

export default PersonalInfoForm;
