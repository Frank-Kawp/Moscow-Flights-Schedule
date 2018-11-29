import React, { Component } from 'react';
import clientApi from '../../services/clientApi';
import Header from '../header';
import SearchPanel from '../search-panel';
import FlightsTable from '../flights-table';

import './app.css';

export default class App extends Component {
  getDataFromServer = new clientApi();

  state = {
  	data: null,
  	term: '',
    filter: 'all'
  };

  constructor() {
		super();
		this.loadData();
	}

  loadData() {
  	this.getDataFromServer.getAllFlights()
  		.then((data) => {
  			this.setState({
  				data: data
  			});
  		});
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  searchItem(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(({ flight, direction, carrier }) => {
      const string = `${flight}${direction}${carrier}`;
      return string.toLowerCase()
                   .indexOf(term.toLowerCase()) > -1;
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'arrivals':
        return items.filter(({ event }) => event === 'Прибытие' );
      case 'departures':
        return items.filter(({ event }) => event === 'Отправление' );
      default:
        return items;
    }
  };

  render() {
    const { data, term, filter } = this.state;

    const visibleItems = this.filter(
        this.searchItem(data, term), filter);

  	return (
	    <div className='app'>
	      <Header />
	      <SearchPanel
          filter={ this.state.filter }
          onSearchChange={ this.onSearchChange }
          onFilterChange={ this.onFilterChange }
        />
	      <FlightsTable 
	      	data={ visibleItems }
	      />
	    </div>
	  );
  }
};