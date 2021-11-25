import { Component } from "react";
import { capitalize, getSelectType } from "../util";
import Input from "./input";
import Select from "./select";

class Group extends Component {
  getGroupName(str) {
    return str.slice(0, str.search(/[A-Z]/));
  }

  slitGroup() {
    const arr = [];
    this.props.group.fields.forEach((field) => {
      const index = arr.findIndex(
        (obj) => obj.name === this.getGroupName(field.name)
      );

      if (index !== -1) {
        arr[index].fields.push({
          name: `${field.name}.${field.subName}`,
          type: "select",
          value: "",
        });
      } else {
        arr.push({
          name: this.getGroupName(field.name),
          fields: [
            {
              name: `${field.name}.${field.subName}`,
              type: "select",
              value: "",
            },
          ],
        });
      }
    });
    return arr;
  }

  render() {
    if (this.props.group.hasSubGroup) {
      const subGroups = this.slitGroup();
      return (
        <fieldset className="group-control field-container gap-0 flex-wrap">
          <legend>{this.props.group.name}</legend>
          {subGroups.map((group) => (
            <Group group={group} />
          ))}
        </fieldset>
      );
    }

    return (
      <fieldset className="group-control field-container">
        <legend>{capitalize(this.props.group.name)}</legend>
        {this.props.group.fields.map((field) => {
          if (field.type && field.type === "select") {
            return (
              <Select name={field.name} type={getSelectType(field.name)} />
            );
          }
          return <Input field={field} />;
        })}
      </fieldset>
    );
  }
}

export default Group;
