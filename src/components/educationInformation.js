import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { fakeDeepCopy, getSelectType } from "../util";
import Form from "./form";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { getMonth, getYear } from "date-fns";
import List from "./list";
import isEqual from "date-fns/isEqual";
import lastDayOfYear from "date-fns/lastDayOfYear";

export const ActionsContext = React.createContext({
  id: "",
  actionsSettings: {},
});

export const EventHandlers = React.createContext({
  editEducation: () => {},
  updateEducation: () => {},
  toggleIsEditing: () => {},
});

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
          completed: true,
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
    this.editEducation = this.editEducation.bind(this);
    this.deleteEducation = this.deleteEducation.bind(this);
    this.toggleIsAdding = this.toggleIsAdding.bind(this);
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.updateEducation = this.updateEducation.bind(this);
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

    if (dateVal.year === "-1" && dateVal.month === "-1") {
      return new Date();
    }

    if (dateVal.year !== "" && dateVal.month === "") {
      return new Date(dateVal.year, 11, 31);
    }

    if (dateVal.year === "" && dateVal.month !== "") {
      return new Date(getYear(new Date()), dateVal.month);
    }

    if (dateVal.year !== "" && dateVal.month !== "") {
      return new Date(dateVal.year, dateVal.month);
    }
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

  editEducation(id) {
    const edu = this.state.educationInfo.find((e) => e.id === id);
    let falseDeep = fakeDeepCopy(this.state.form);

    falseDeep[0].fields[0].value = edu.school;
    falseDeep[1].fields[0].value = edu.degree;
    falseDeep[2].fields[0].value = getMonth(edu.timePeriod.start);
    falseDeep[2].fields[1].value = getYear(edu.timePeriod.start);
    falseDeep[2].fields[2].value = getMonth(edu.timePeriod.end);
    falseDeep[2].fields[3].value = getYear(edu.timePeriod.end);
    return falseDeep;
  }

  updateEducation(e, id) {
    this.setState(({ educationInfo }) => {
      const index = educationInfo.findIndex((edu) => edu.id === id);

      return {
        educationInfo: [
          ...educationInfo.slice(0, index),
          {
            ...educationInfo[index],
            isEditing: false,
            school: e.target["school"].value,
            degree: e.target["degree"].value,
            timePeriod: {
              start: this.getDate(e.target, "startDate"),
              end: this.getDate(e.target, "endDate"),
            },
          },
          ...educationInfo.slice(index + 1),
        ],
      };
    });
  }

  deleteEducation(id) {
    this.setState((prevState) => {
      const newEducationInfo = prevState.educationInfo.filter(
        (edu) => edu.id !== id
      );
      if (newEducationInfo.length === 0) {
        return {
          isAdding: true,
          educationInfo: newEducationInfo,
        };
      }
      return {
        educationInfo: newEducationInfo,
      };
    });
  }

  toggleIsAdding() {
    this.setState((prevState) => ({
      isAdding: !prevState.isAdding,
    }));
  }

  toggleIsEditing(id) {
    this.setState(({ educationInfo }) => {
      const index = educationInfo.findIndex((edu) => edu.id === id);
      return {
        educationInfo: [
          ...educationInfo.slice(0, index),
          {
            ...educationInfo[index],
            isEditing: !educationInfo[index].isEditing,
          },
          ...educationInfo.slice(index + 1),
        ],
      };
    });
  }

  render() {
    return (
      <article className="info-container">
        <h2 className="title">Educational Experience</h2>
        {this.state.isAdding && (
          <Form
            defaultForm={this.state.form}
            submitHandler={this.addEducation}
            hideForm={
              this.state.educationInfo.length > 0 && this.toggleIsAdding
            }
          />
        )}
        {this.state.educationInfo.length > 0 && (
          <ActionsContext.Provider
            value={{
              actionsSettings: {
                edit: {
                  action: this.toggleIsEditing,
                  icon: faEdit,
                  class: "btn-edit",
                },
                delete: {
                  action: this.deleteEducation,
                  icon: faTrash,
                  class: "btn-delete",
                },
              },
            }}
          >
            <EventHandlers.Provider
              value={{
                editEducation: this.editEducation,
                updateEducation: this.updateEducation,
                toggleIsEditing: this.toggleIsEditing,
              }}
            >
              <List items={this.state.educationInfo} />
            </EventHandlers.Provider>
          </ActionsContext.Provider>
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
