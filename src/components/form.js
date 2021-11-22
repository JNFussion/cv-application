import { Component } from "react";
import Group from "./group";
import Input from "./input";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.section;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState((prevState) => {
      let groupIndex = -1;
      let fieldIndex = -1;
      const targetGroup = prevState.form.find((group, index) => {
        fieldIndex = group.fields.findIndex(
          (field) => field.name === e.target.name
        );

        if (fieldIndex !== -1) {
          groupIndex = index;
          return group;
        }
      });
      const newGroupValue = { ...targetGroup };
      newGroupValue.fields[fieldIndex].value = e.target.value;
      return {
        form: [
          ...prevState.form.slice(0, groupIndex),
          newGroupValue,
          ...prevState.form.slice(groupIndex + 1),
        ],
      };
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
            return (
              <Input
                field={group.fields[0]}
                changeHandler={this.handleChange}
              />
            );
          }
          return <Group group={group} changeHandler={this.handleChange} />;
        })}
        <button type="submit" className="btn-submit transition-state">
          Save
        </button>
      </form>
    );
  }
}

export default Form;
