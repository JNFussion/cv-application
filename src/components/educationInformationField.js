import { format, isEqual, isToday, isValid, lastDayOfYear } from "date-fns";
import { Component } from "react";
import ActionButton from "./actionButton";

class EducationInformationField extends Component {
  constructor(props) {
    super(props);

    this.state = { actionBtnTypes: ["edit", "delete"] };
  }

  timePeriodFormatted(date) {
    if (!isValid(date)) {
      return "Unknown";
    }
    if (isToday(date)) {
      return "Present";
    }
    if (isEqual(lastDayOfYear(date), date)) {
      return format(date, "yyyy");
    }

    return format(date, "MM-yyyy");
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
          <h2 className="text-xl font-bold">{this.props.item.degree}</h2>
          <p className="px-1 text-sm font-light">{this.props.item.school}</p>
        </article>
        <div className="flex items-start gap-2">
          {this.state.actionBtnTypes.map((type) => (
            <ActionButton btnType={type} id={this.props.item.id} />
          ))}
        </div>
      </li>
    );
  }
}

export default EducationInformationField;
