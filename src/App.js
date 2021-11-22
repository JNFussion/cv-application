import { Component } from "react";
import EducationInformation from "./components/educationInformation";
import GeneralInformation from "./components/generalInformation";

class App extends Component {
  render() {
    return (
      <div className="mx-auto max-w-half">
        <GeneralInformation />
        <EducationInformation />
      </div>
    );
  }
}
export default App;
