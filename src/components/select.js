import * as dateFns from "date-fns";
import { Component } from "react";
import { capitalize } from "../util";
import { FormContext } from "./form";

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: {
        length: 100,
        format: "yyyy",
        fn: dateFns.subYears,
      },
      month: {
        length: 12,
        format: "MMMM",
        fn: dateFns.addMonths,
      },
    };
  }

  getOption(date, index) {
    return (
      <option
        key={index}
        value={dateFns["get" + capitalize(this.props.type)](date)}
      >
        {dateFns.format(date, this.state[this.props.type].format)}
      </option>
    );
  }

  render() {
    const dates = [];
    for (let i = 0; i < this.state[this.props.type].length; i++) {
      dates.push(this.state[this.props.type].fn(new Date(2021, 0, 1), i));
    }

    return (
      <FormContext.Consumer>
        {({ handleChange }) => {
          return (
            <select
              name={this.props.name}
              value={this.props.value}
              onChange={handleChange}
            >
              <option value="">-- No Specified --</option>
              {dates.map((date, index) => this.getOption(date, index))}
            </select>
          );
        }}
      </FormContext.Consumer>
    );
  }
}

export default Select;
