import React, { Component } from "react";
import Header from "../header";
import SearchPanel from "../search-panel";
import FlightsTable from "../flights-table";
import FilterButtons from "../filter-buttons";

import clientApi from "../../services/clientApi";
import whyDidYouUpdate from "why-did-you-update";

import "./app.css";

if (process.env.NODE_ENV !== "production") {
  whyDidYouUpdate(React);
}

export default class App extends Component {
  getData = new clientApi();

  state = {
    data: null,
    term: "",
    filter: "all"
  };

  componentDidMount() {
    this.loadData();
  }

  onError = err => {
    this.setState({
      data: null
    });
  };

  loadData() {
    this.getData
      .getAllFlights()
      .then(data => {
        this.setState({
          data: data
        });
      })
      .catch(this.onError);
  }

  onSearchChange = term => {
    this.setState({ term });
  };

  searchItem(items, term) {
    if (term.length === 0) return items;

    return items.filter(({ flight, direction, carrier }) => {
      const string = `${flight}${direction}${carrier}`;
      return string.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "arrivals":
        return items.filter(({ event }) => event === "Прибытие");
      case "departures":
        return items.filter(({ event }) => event === "Отправление");
      default:
        return items;
    }
  }

  render() {
    const { data, term, filter } = this.state;
    const visibleItems = this.filter(this.searchItem(data, term), filter);

    return (
      <div className="app">
        <Header />

        <div className="search-and-buttons">
          <SearchPanel onSearchChange={this.onSearchChange} />

          <FilterButtons
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <FlightsTable data={visibleItems} />
      </div>
    );
  }
}
