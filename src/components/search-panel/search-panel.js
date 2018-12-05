import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    term: ""
  };

  shouldComponentUpdate(prevProps, prevState) {
    if (prevProps === this.props) {
      return false;
    } else if (prevState === this.state) {
      return false;
    } else {
      return true;
    }
  }

  onSearchChange = e => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <div className="search-panel">
        <input
          type="text"
          className="form-control"
          placeholder="Search by number, direction or name of a carrier ..."
          value={this.state.term}
          onChange={this.onSearchChange}
        />
      </div>
    );
  }
}
