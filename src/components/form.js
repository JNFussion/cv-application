import React, { Component } from "react";
import uniqid from "uniqid";
import Group from "./group";
import Input from "./input";

export const FormContext = React.createContext({
  form: [],
  handleChange: () => {},
});

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = { form: this.props.defaultForm };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState((prevState) => {
      const newForm = prevState.form.map((group) => {
        group.fields.map((field) => {
          if (field.name === e.target.name) {
            field.value = e.target.value;
          }
          return field;
        });
        return group;
      });
      return { form: newForm };
    });
  }

  render() {
    return (
      <form
        action="#"
        onSubmit={this.props.submitHandler}
        className="info-container"
      >
        {this.state.form.map((group) => {
          if (group.name === undefined) {
            return <Input field={group.fields[0]} />;
          }
          return (
            <FormContext.Provider
              value={{ form: this.state.form, handleChange: this.handleChange }}
            >
              <Group group={group} />
            </FormContext.Provider>
          );
        })}
        <button type="submit" className="btn-submit transition-state">
          Save
        </button>
      </form>
    );
  }
}

export default Form;
