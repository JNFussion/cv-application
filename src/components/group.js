import { Component } from "react";
import uniqid from "uniqid";
import { capitalize, getSelectType } from "../util";
import Input from "./input";
import Select from "./select";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { timePeriodCompleted: this.props.timePeriodCompleted };

    this.toggleTimePeriodCompleted = this.toggleTimePeriodCompleted.bind(this);
  }

  toggleTimePeriodCompleted() {
    this.setState((prevState) => ({
      timePeriodCompleted: !prevState.timePeriodCompleted,
    }));
  }

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
          id: field.id,
          name: `${field.name}.${field.subName}`,
          type: "select",
          value: field.value,
        });
      } else {
        arr.push({
          id: uniqid(),
          name: this.getGroupName(field.name),
          fields: [
            {
              id: field.id,
              name: `${field.name}.${field.subName}`,
              type: "select",
              value: field.value,
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
        <fieldset className="group-control field-container gap-0 block flex-wrap">
          <legend>{this.props.group.name}</legend>
          {subGroups.map((group) => (
            <Group
              key={group.id}
              group={group}
              timePeriodCompleted={this.state.timePeriodCompleted}
            />
          ))}
        </fieldset>
      );
    }

    return (
      <fieldset className={"group-control field-container"}>
        <legend>{capitalize(this.props.group.name)}</legend>
        {this.props.group.fields.map((field) => {
          if (this.state.timePeriodCompleted) {
            if (field.name === "endDate.month") {
              return undefined;
            }
            if (field.type && field.name.startsWith("startDate")) {
              return (
                <Select
                  key={field.id}
                  name={field.name}
                  type={getSelectType(field.name)}
                  value={field.value}
                />
              );
            }

            return (
              <Input
                key={field.id}
                field={{
                  type: "checkbox",
                  labelText: "On Progress",
                  name: "endDate",
                }}
                toggleTimePeriodCompleted={this.toggleTimePeriodCompleted}
              />
            );
          } else {
            if (field.type && field.type === "select") {
              return (
                <Select
                  key={field.id}
                  name={field.name}
                  type={getSelectType(field.name)}
                  value={field.value}
                />
              );
            }
          }
          return <Input key={field.id} field={field} />;
        })}
      </fieldset>
    );
  }
}

export default Group;
