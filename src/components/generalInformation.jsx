import { Component } from "react";
import "../styles/generalInformation.css";
import PersonalInfoForm from "./personalInfoForm";
import PersonalInfoArticle from "./personalInfoArticle";

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
    if (this.state.isEditing) {
      return (
        <PersonalInfoForm
          submitHandler={this.handleSubmit}
          personalInfo={this.state.personalInfo}
        />
      );
    } else {
      return (
        <PersonalInfoArticle
          personalInfo={this.state.personalInfo}
          clickHandler={this.edit}
        />
      );
    }
  }
}

export default GeneralInformation;
