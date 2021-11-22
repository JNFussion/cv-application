import { format, isEqual } from "date-fns";
import { Component } from "react";

class EducationInformationField extends Component {
  timePeriodFormatted(date) {
    if (isEqual(date, new Date("", ""))) {
      return "Present";
    }
    return format(date, "MM-yyyy");
  }

  render() {
    return (
      <li className="m-2 px-4 py-2 border border-solid border-blue-200 rounded-md bg-gray-200">
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
      </li>
    );
  }
}

export default EducationInformationField;
