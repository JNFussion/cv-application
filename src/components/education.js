import React, { Component } from "react";
import Experience from "./experience";

class EducationInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdding: true,
      experienceInfo: [],
      form: [
        {
          fields: [
            {
              name: "school",
              placeholder: "University of Bologna",
              value: "",
            },
          ],
        },
        {
          fields: [
            {
              name: "degree",
              placeholder: "Computer Science",
              value: "",
            },
          ],
        },
        {
          hasSubGroup: true,
          completed: true,
          name: "Period of study",
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
        school: "",
        degree: "",
        timePeriod: {
          start: "",
          end: "",
        },
      },
    };
  }

  render() {
    return (
      <Experience typeExperience={"Educational"} experience={this.state} />
    );
  }
}

export default EducationInformation;
