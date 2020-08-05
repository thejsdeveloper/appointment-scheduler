import React, { Component } from "react";

import "../css/App.css";
import AddAppointments from "./AddAppointments";
import ListAppointment from "./ListApointments";
import SearchAppointments from "./SearchAppointments";
import { without } from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay: false,
    };
  }

  componentDidMount() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((rs) => {
          rs.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return rs;
        });
        this.setState({
          myAppointments: apts,
        });
      });
  }

  deleteAppointments = (apt) => {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({ myAppointments: tempApts });
  };

  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                ></AddAppointments>
                <SearchAppointments></SearchAppointments>
                <ListAppointment
                  appointments={this.state.myAppointments}
                  deleteAppointments={this.deleteAppointments}
                ></ListAppointment>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
