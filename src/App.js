import { Component } from "react";
import Education from "./components/education";
import GeneralInformation from "./components/generalInformation";
import Job from "./components/job";

class App extends Component {
  render() {
    return (
      <div className="mx-auto max-w-half">
        <GeneralInformation />
        <Education />
        <Job />
      </div>
    );
  }
}
export default App;
