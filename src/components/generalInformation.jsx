import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Form from "./form";
import PersonalInfoContent from "./personalInfoContent";

class GeneralInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: true,
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
      section: {
        title: "Personal Info.",
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
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.edit = this.edit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
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
    this.setState({ isEditing: true });
  }

  render() {
    return (
      <article className="info-container">
        <button className="btn-edit" onClick={this.edit}>
          <div className="icon-container">
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </button>
        <h2 className="title">Personal Info.</h2>

        {this.state.isEditing ? (
          <Form
            submitHandler={this.handleSubmit}
            section={this.state.section}
          />
        ) : (
          <PersonalInfoContent personalInfo={this.state.personalInfo} />
        )}
      </article>
    );
  }
}

export default GeneralInformation;
