import { Component } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Form from "./form";
import PersonalInfoContent from "./personalInfoContent";
import ActionButton from "./actionButton";
import { ActionsContext } from "./educationInformation";
import { fakeDeepCopy } from "../util";

class GeneralInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: true,
      isEditing: false,
      personalInfo: {
        firstName: "",
        lastName: "",
        location: {
          city: "",
          country: "",
        },
        contact: {
          phoneNumber: "",
          email: "",
        },
      },
      form: [
        {
          name: "Full Name",
          fields: [
            {
              name: "firstName",
              placeholder: "John",
              value: "",
            },
            {
              name: "lastName",
              placeholder: "Doe",
              value: "",
            },
          ],
        },
        {
          name: "Current Location",
          fields: [
            {
              name: "city",
              placeholder: "Madrid",
              value: "",
            },
            {
              name: "country",
              placeholder: "Spain",
              value: "",
            },
          ],
        },
        {
          name: "Contact",
          fields: [
            {
              name: "phoneNumber",
              value: "",
              type: "tel",
              placeholder: "XXX XX XX XX",
            },
            {
              name: "email",
              placeholder: "johnDoe@example.com",
              value: "",
              type: "email",
            },
          ],
        },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isAdding: false,
      isEditing: false,
      personalInfo: {
        firstName: e.target["firstName"].value,
        lastName: e.target["lastName"].value,
        location: {
          city: e.target["city"].value,
          country: e.target["country"].value,
        },
        contact: {
          phoneNumber: e.target["phoneNumber"].value,
          email: e.target["email"].value,
        },
      },
    });
  }

  edit() {
    let falseDeep = fakeDeepCopy(this.state.form);
    falseDeep[0].fields[0].value = this.state.personalInfo.firstName;
    falseDeep[0].fields[1].value = this.state.personalInfo.lastName;
    falseDeep[1].fields[0].value = this.state.personalInfo.location.city;
    falseDeep[1].fields[1].value = this.state.personalInfo.location.country;
    falseDeep[2].fields[0].value = this.state.personalInfo.contact.phoneNumber;
    falseDeep[2].fields[1].value = this.state.personalInfo.contact.email;

    return falseDeep;
  }

  toggleEdit() {
    this.setState((prevState) => ({ isEditing: !prevState.isEditing }));
  }

  render() {
    return (
      <article className="info-container">
        <h2 className="title">
          <span>Personal Info.</span>
          {!this.state.isEditing && !this.state.isAdding && (
            <ActionsContext.Provider
              value={{
                actionsSettings: {
                  edit: {
                    action: this.toggleEdit,
                    icon: faEdit,
                    class: "btn-edit",
                  },
                },
              }}
            >
              <ActionButton btnType="edit" />
            </ActionsContext.Provider>
          )}
        </h2>
        {this.state.isAdding || this.state.isEditing ? (
          <Form
            submitHandler={this.handleSubmit}
            defaultForm={this.state.isEditing ? this.edit() : this.state.form}
            hideForm={this.state.isEditing && this.toggleEdit}
          />
        ) : (
          <PersonalInfoContent personalInfo={this.state.personalInfo} />
        )}
      </article>
    );
  }
}

export default GeneralInformation;
