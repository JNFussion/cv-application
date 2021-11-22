import uniqid from "uniqid";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { getSelectType } from "../util";
import EducationInformationField from "./educationInformationField";
import Form from "./form";

class EducationInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: true,
      educationInfo: [],
      section: {
        showTitle: true,
        title: "Educational Experience",
        form: [
          {
            fields: [
              {
                name: "school",
                placeholder: "University of Bologna",
                value: "",
              },
            ],
          },
          {
            fields: [
              {
                name: "degree",
                placeholder: "Computer Science",
                value: "",
              },
            ],
          },
          {
            hasSubGroup: true,
            name: "Period of study",
            fields: [
              {
                name: "startDate",
                subName: "month",
                type: "select",
                value: "",
              },
              {
                name: "startDate",
                subName: "year",
                type: "select",
                value: "",
              },
              {
                name: "endDate",
                subName: "month",
                type: "select",
                value: "",
              },
              {
                name: "endDate",
                subName: "year",
                type: "select",
                value: "",
              },
            ],
          },
        ],
      },
    };

    this.addEducation = this.addEducation.bind(this);
  }

  getDate(form, name) {
    const dateVal = Array.from(form).reduce((obj, field) => {
      const regex = new RegExp(name);
      if (field.name && regex.test(field.name)) {
        const type = getSelectType(field.name);
        obj[type] = field.value;
      }
      return obj;
    }, {});
    return new Date(dateVal.year, dateVal.month);
  }

  addEducation(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        isAdding: false,
        educationInfo: [
          ...prevState.educationInfo,
          {
            id: uniqid(),
            isEditing: false,
            school: e.target["school"].value,
            degree: e.target["degree"].value,
            timePeriod: {
              start: this.getDate(e.target, "startDate"),
              end: this.getDate(e.target, "endDate"),
            },
          },
        ],
      };
    });
  }

  render() {
    return (
      <article className="info-container">
        <button className="btn-edit" onClick={this.props.clickHandler}>
          <div className="icon-container">
            <FontAwesomeIcon icon={faEdit} />
          </div>
        </button>
        <h2 className="title">Educational Experience</h2>
        {this.state.isAdding && (
          <Form
            section={this.state.section}
            submitHandler={this.addEducation}
          />
        )}
        {this.state.educationInfo.length > 0 && (
          <ul>
            {this.state.educationInfo.map((item) => (
              <EducationInformationField item={item} />
            ))}
          </ul>
        )}
      </article>
    );
  }
}

export default EducationInformation;
