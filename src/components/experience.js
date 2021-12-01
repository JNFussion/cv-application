import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { fakeDeepCopy, getKeys, getSelectType } from "../util";
import Form from "./form";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { addYears, getMonth, getYear, isFuture } from "date-fns";
import List from "./list";
import isEqual from "date-fns/isEqual";
import lastDayOfYear from "date-fns/lastDayOfYear";

export const ActionsContext = React.createContext({
  id: "",
  actionsSettings: {},
});

export const EventHandlers = React.createContext({
  editExperience: () => {},
  updateExperience: () => {},
  toggleIsEditing: () => {},
});

/**
 *
 * Component that represent experiences sections on a resume. Can be: educational or practical.
 *
 */

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeExperience: this.props.typeExperience,
    };
    this.state = {
      ...this.state,
      ...fakeDeepCopy(this.props.experience),
    };

    this.addExperience = this.addExperience.bind(this);
    this.editExperience = this.editExperience.bind(this);
    this.deleteExperience = this.deleteExperience.bind(this);
    this.toggleIsAdding = this.toggleIsAdding.bind(this);
    this.toggleIsEditing = this.toggleIsEditing.bind(this);
    this.updateExperience = this.updateExperience.bind(this);
  }

  /**
   * Creates an new experience from blankExperience, puts the values of the form into the new object.
   * @param {*} form Submited form.
   * @returns Filled experience.
   */

  fillExperience(form) {
    const keys = getKeys(this.state.blankExperience);
    const updatedExperience = fakeDeepCopy(this.state.blankExperience);

    keys.forEach((key) => {
      if (key === "start" || key === "end") {
        updatedExperience.timePeriod[key] = this.getDate(form, key + "Date");
      } else {
        updatedExperience[key] = form[key].value;
      }
    });

    return updatedExperience;
  }

  /**
   * Gets a Date object from the values submited with selects. Its create a object to get both values: month and year.
   * The object has this structure => { month: number, year: number}
   *
   *
   * @param {*} form Submited form
   * @param {*} name Name of the select
   * @returns A date. Possible dates:
   *  - Values are -1 => A date in the future.
   *  - Missing month with year => last day of the year.
   *  - Missing year with month => Current year is assumed.
   *  - No missing values => Date with these values.
   */

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
      return addYears(new Date(), 5);
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

  /**
   *  Create a new Experience. it's added to state.
   *
   * @param {*} e  Form's submit event.
   */

  addExperience(e) {
    e.preventDefault();

    this.setState((prevState) => {
      return {
        isAdding: false,
        experienceInfo: [
          ...prevState.experienceInfo,
          {
            id: uniqid(),
            isEditing: false,
            ...this.fillExperience(e.target),
          },
        ],
      };
    });
  }

  /**
   * Prepare a experience item to be edited. It find the experience to be edited by id,
   * makes a copy of the form and puts the values of the experience on it.
   *
   * @param {string} id ID of the experience to be edited.
   * @returns Form with values of the experience.
   *
   */
  editExperience(id) {
    const edu = this.state.experienceInfo.find((e) => e.id === id);
    let falseDeep = fakeDeepCopy(this.state.form);
    const keys = getKeys(this.state.blankExperience);
    keys.forEach((key) => {
      falseDeep.forEach((group) => {
        group.fields.forEach((field) => {
          if (field.name.includes(key)) {
            if (field.subName && field.subName === "month") {
              if (isFuture(edu.timePeriod[key])) {
                return (field.value = "-1");
              }
              if (
                isEqual(lastDayOfYear(edu.timePeriod[key]), edu.timePeriod[key])
              ) {
                return (field.value = "");
              }
              if (edu.timePeriod[key] === undefined) {
                return (field.value = "");
              }
              return (field.value = getMonth(edu.timePeriod[key]));
            }
            if (field.subName && field.subName === "year") {
              if (isFuture(edu.timePeriod[key])) {
                return (field.value = "-1");
              }
              if (edu.timePeriod[key] === undefined) {
                return (field.value = "");
              }
              return (field.value = getYear(edu.timePeriod[key]));
            }
            return (field.value = edu[key]);
          }
        });
      });
    });
    return falseDeep;
  }

  /**
   * Update an existing experience. It's destructured into the current state.
   *
   * @param {*} e  Form's submit event.
   */

  updateExperience(e, id) {
    this.setState(({ experienceInfo }) => {
      const index = experienceInfo.findIndex((edu) => edu.id === id);

      return {
        experienceInfo: [
          ...experienceInfo.slice(0, index),
          {
            ...experienceInfo[index],
            isEditing: false,
            ...this.fillExperience(e.target),
          },
          ...experienceInfo.slice(index + 1),
        ],
      };
    });
  }

  /**
   * Delete an existing experience by setting a filtered previous state to state.
   *
   * @param {string} id ID of experience to be deleted.
   */

  deleteExperience(id) {
    this.setState((prevState) => {
      const newExperienceInfo = prevState.experienceInfo.filter(
        (edu) => edu.id !== id
      );
      if (newExperienceInfo.length === 0) {
        return {
          isAdding: true,
          experienceInfo: newExperienceInfo,
        };
      }
      return {
        experienceInfo: newExperienceInfo,
      };
    });
  }

  toggleIsAdding() {
    this.setState((prevState) => ({
      isAdding: !prevState.isAdding,
    }));
  }

  toggleIsEditing(id) {
    this.setState(({ experienceInfo }) => {
      const index = experienceInfo.findIndex((edu) => edu.id === id);
      return {
        experienceInfo: [
          ...experienceInfo.slice(0, index),
          {
            ...experienceInfo[index],
            isEditing: !experienceInfo[index].isEditing,
          },
          ...experienceInfo.slice(index + 1),
        ],
      };
    });
  }

  render() {
    return (
      <article className="info-container">
        <h2 className="title">{this.state.typeExperience} Experience</h2>
        {this.state.isAdding && (
          <Form
            defaultForm={this.state.form}
            submitHandler={this.addExperience}
            hideForm={
              this.state.experienceInfo.length > 0 && this.toggleIsAdding
            }
          />
        )}
        {this.state.experienceInfo.length > 0 && (
          <ActionsContext.Provider
            value={{
              actionsSettings: {
                edit: {
                  action: this.toggleIsEditing,
                  icon: faEdit,
                  class: "btn-edit",
                },
                delete: {
                  action: this.deleteExperience,
                  icon: faTrash,
                  class: "btn-delete",
                },
              },
            }}
          >
            <EventHandlers.Provider
              value={{
                editExperience: this.editExperience,
                updateExperience: this.updateExperience,
                toggleIsEditing: this.toggleIsEditing,
              }}
            >
              <List items={this.state.experienceInfo} />
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

export default Experience;
