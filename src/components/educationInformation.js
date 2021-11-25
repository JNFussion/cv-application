import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component } from "react";
import { getSelectType } from "../util";
import EducationInformationField from "./educationInformationField";
import Form from "./form";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

class EducationInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: true,
      educationInfo: [],
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
    };

    this.addEducation = this.addEducation.bind(this);
    this.toggleIsAdding = this.toggleIsAdding.bind(this);
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
  toggleIsAdding() {
    this.setState((prevState) => ({
      isAdding: !prevState.isAdding,
    }));
  }

  render() {
    return (
      <article className="info-container">
        <h2 className="title">Educational Experience</h2>
        {this.state.isAdding && (
          <Form
            isAdding={this.state.isAdding}
            defaultForm={this.state.form}
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

        {!this.state.isAdding && (
          <button
            onClick={this.toggleIsAdding}
            className="btn transition-state block m-3 ml-auto text-xl text-indigo-500 hover:text-indigo-700"
          >
            <div className="icon-container">
              <FontAwesomeIcon icon={faPlusSquare} />
            </div>
          </button>
        )}
      </article>
    );
  }
}

export default EducationInformation;
