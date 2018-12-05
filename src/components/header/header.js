import React, { PureComponent } from "react";
import "./header.css";

export default class Header extends PureComponent {
  render() {
    return (
      <div className="header">
        <h3 className="header-logo">
          <a href="/">Moscow Flights Schedule</a>
        </h3>
      </div>
    );
  }
}
