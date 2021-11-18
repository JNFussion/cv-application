import { Component } from "react";
import PersonalInfoField from "./personalInfoField";

class PersonalInfoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: {
        name: "firstName",
        placeholder: "John",
      },
      lastName: {
        name: "lastName",
        placeholder: "Doe",
      },
      city: {
        name: "city",
        placeholder: "Madrid",
      },
      country: {
        name: "country",
        placeholder: "Spain",
      },
      phoneNumber: {
        name: "phoneNumber",
      },
      email: {
        name: "email",
        placeholder: "johnDoe@example.com",
      },
    };
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

          <fieldset className="group-control">
            <legend>Full Name</legend>
            <PersonalInfoField type={this.state.firstName} isEditing={true} />
            <PersonalInfoField type={this.state.lastName} isEditing={true} />
          </fieldset>
          <fieldset className="group-control">
            <legend>Current Location</legend>
            <PersonalInfoField type={this.state.city} isEditing={true} />
            <PersonalInfoField type={this.state.country} isEditing={true} />
          </fieldset>
          <fieldset className="group-control">
            <legend>Contact</legend>
            <PersonalInfoField type={this.state.phoneNumber} isEditing={true} />
            <PersonalInfoField type={this.state.email} isEditing={true} />
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
