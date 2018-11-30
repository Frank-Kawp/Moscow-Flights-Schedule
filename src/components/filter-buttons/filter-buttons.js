import React, { Component } from 'react';
import './filter-buttons.css'



export default class FilterButtons extends Component {

  buttons = [
    { name: 'all', label: 'All Flights' },
    { name: 'departures', label: 'Departures' },
    { name: 'arrivals', label: 'Arrivals' }
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button type="button"
                className={`btn ${clazz}`}
                key={ name }
                onClick={ () => onFilterChange(name) }
        >
          { label }
        </button>
     	)
    });

    return (
			<div className="filter-buttons btn-group">
			  { buttons }
			</div>
    );
  };
};