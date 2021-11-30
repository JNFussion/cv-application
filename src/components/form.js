import React, { Component } from "react";
import uniqid from "uniqid";
import { fakeDeepCopy } from "../util";
import Group from "./group";
import Input from "./input";

class Form extends Component {
  constructor(props) {
    super(props);
    const aux = { form: fakeDeepCopy(this.props.defaultForm) };
    aux.form.forEach((group) => {
      group.id = uniqid();
      group.fields.forEach((field) => (field.id = uniqid()));
    });

    this.state = aux;

    this.handleChange = this.handleChange.bind(this);
  }

  findIndexes(name) {
    const names = name.split(".");
    return this.state.form.reduce((i, group, index) => {
      const fieldIndex = group.fields.findIndex((field) => {
        if (names.length === 1) {
          return field.name === names[0];
        }
        return field.name === names[0] && field.subName === names[1];
      });
      if (fieldIndex !== -1) {
        i.group = index;
        i.field = fieldIndex;
      }
      return i;
    }, {});
  }

  handleChange(e) {
    const indexes = this.findIndexes(e.target.name);

    this.setState(({ form }) => {
      const startFields = form[indexes.group].fields.slice(0, indexes.field);
      const restFields = form[indexes.group].fields.slice(indexes.field + 1);

      return {
        form: [
          ...form.slice(0, indexes.group),
          {
            ...form[indexes.group],
            fields: [
              ...startFields,
              {
                ...form[indexes.group].fields[indexes.field],
                value: e.target.value,
              },
              ...restFields,
            ],
          },
          ...form.slice(indexes.group + 1),
        ],
      };
    });
  }

  getSubmitHandler(e) {
    if (this.props.eduId) {
      return this.props.submitHandler(e, this.props.eduId);
    }
    return this.props.submitHandler(e);
  }

  render() {
    return (
      <form
        action="#"
        onSubmit={(e) => this.getSubmitHandler(e)}
        className="info-container"
      >
        {this.state.form.map((group) => {
          if (group.name === undefined) {
            return (
              <Input
                key={group.fields[0].id}
                field={group.fields[0]}
                form={this.state.form}
                handleChange={this.handleChange}
              />
            );
          }
          return (
            <FormContext.Provider
              key={group.id}
              value={{ form: this.state.form, handleChange: this.handleChange }}
            >
              <Group group={group} timePeriodCompleted={group.completed} />
            </FormContext.Provider>
          );
        })}

        <div className="btn-form-group transition-state">
          {this.props.hideForm && (
            <button
              onClick={
                this.props.eduId
                  ? () => this.props.hideForm(this.props.eduId)
                  : this.props.hideForm
              }
              className="btn-form btn-cancel transition-state"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn-form btn-submit transition-state"
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

export const FormContext = React.createContext({
  form: [],
  handleChange: () => {},
});

export default Form;
