import React, { Component } from "react";
import Experience from "./experience";

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: true,
      experienceInfo: [],
      form: [
        {
          fields: [
            {
              name: "company",
              placeholder: "GitHub ",
              value: "",
            },
          ],
        },
        {
          fields: [
            {
              name: "position",
              placeholder: "Software Engineer",
              value: "",
            },
          ],
        },
        {
          fields: [
            {
              name: "mainTask",
              value: "",
            },
          ],
        },
        {
          hasSubGroup: true,
          completed: true,
          name: "Period in the company",
          fields: [
            {
              name: "startDate",
              subName: "month",
              type: "select",
              value: "",
            },
            {
              name: "startDate",
              subName: "year",
              type: "select",
              value: "",
            },
            {
              name: "endDate",
              subName: "month",
              type: "select",
              value: "",
            },
            {
              name: "endDate",
              subName: "year",
              type: "select",
              value: "",
            },
          ],
        },
      ],
      blankExperience: {
        position: "",
        company: "",
        mainTask: "",
        timePeriod: {
          start: "",
          end: "",
        },
      },
    };
  }

  render() {
    return <Experience typeExperience={"Practical"} experience={this.state} />;
  }
}

export default Job;
