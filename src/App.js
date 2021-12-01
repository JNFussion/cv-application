import { Component } from "react";
import Education from "./components/education";
import Personal from "./components/personal";
import Job from "./components/job";

class App extends Component {
  render() {
    return (
      <div className="mx-auto max-w-half">
        <Personal />
        <Education />
        <Job />
      </div>
    );
  }
}
export default App;
