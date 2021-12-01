import { format, isEqual, isFuture, isValid, lastDayOfYear } from "date-fns";
import { Component } from "react";
import uniqid from "uniqid";
import ActionButton from "./actionButton";

class EducationInformationField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      actionBtnTypes: ["edit", "delete"],
      ids: { edit: uniqid(), delete: uniqid() },
    };
  }

  timePeriodFormatted(date) {
    if (!isValid(date)) {
      return "Unknown";
    }
    if (isFuture(date)) {
      return "Present";
    }
    if (isEqual(lastDayOfYear(date), date)) {
      return format(date, "yyyy");
    }

    return format(date, "MM-yyyy");
  }

  getTitle() {
    if (this.props.item.degree) {
      return this.props.item.degree;
    }
    return this.props.item.position;
  }

  getName() {
    if (this.props.item.school) {
      return this.props.item.school;
    }
    return this.props.item.company;
  }

  renderMainTask() {
    return <p className="px-1">{this.props.item.mainTask}</p>;
  }

  render() {
    return (
      <li className="flex justify-between m-2 px-4 py-2 border border-solid border-blue-200 rounded-md bg-gray-200">
        <article>
          <div className=" text-sm text-gray-800">
            <span>
              {this.timePeriodFormatted(this.props.item.timePeriod.start)}
            </span>{" "}
            /{" "}
            <span>
              {this.timePeriodFormatted(this.props.item.timePeriod.end)}
            </span>
          </div>
          <h2 className="text-xl font-bold">{this.getTitle()}</h2>
          {this.props.item.mainTask && this.renderMainTask()}
          <p className="px-1 text-sm font-light">{this.getName()}</p>
        </article>
        <div className="flex items-start gap-2">
          {this.state.actionBtnTypes.map((type) => (
            <ActionButton
              key={this.state.ids[type]}
              btnType={type}
              id={this.props.item.id}
            />
          ))}
        </div>
      </li>
    );
  }
}

export default EducationInformationField;
