import React, { Component } from "react";
import FilterButtons from "../filter-buttons";

import "./search-panel.css";

export default class SearchPanel extends Component {
  state = {
    term: "",
    filter: this.props.filter
  };

  onSearchChange = e => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  onFilterChange = filter => {
    this.props.onFilterChange(filter);
  };

  render() {
    return (
      <div className="search-panel form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by number, direction or name of a carrier ..."
          value={this.state.term}
          onChange={this.onSearchChange}
        />
        <FilterButtons
          filter={this.props.filter}
          onFilterChange={this.onFilterChange}
        />
      </div>
    );
  }
}
