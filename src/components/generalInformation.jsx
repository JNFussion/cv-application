import { Component } from "react";
import "./generalInformation.css";
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
  }

  resetForm() {
    const obj = { ...this.state.formValues };
    for (const key in obj) {
      obj[key] = "";
    }

    this.setState({ formValues: obj });
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

    this.resetForm();
  }

  render() {
    if (this.state.isEditing) {
      return <PersonalInfoForm submitHandler={this.handleSubmit} />;
    } else {
      return <PersonalInfoArticle personalInfo={this.state.personalInfo} />;
    }
  }
}

export default GeneralInformation;
