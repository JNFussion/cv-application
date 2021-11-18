import { Component } from "react";
import GeneralInformation from "./components/generalInformation";

class App extends Component {
  render() {
    return (
      <div className="mx-auto max-w-half">
        <GeneralInformation />
      </div>
    );
  }
}
export default App;
