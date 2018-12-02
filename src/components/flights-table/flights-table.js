import React from "react";
import FlightItem from "../flight-item";
import Spinner from "../spinner";

import "./flights-table.css";

const FightsTable = ({ data }) => {
  if (!data) {
    return <Spinner />;
  }

  const users = data.map(
    ({ id, event, time, direction, flight, carrier, vehicle, days }) => {
      return (
        <FlightItem
          event={event}
          time={time}
          direction={direction}
          flight={flight}
          carrier={carrier}
          vehicle={vehicle}
          days={days}
          key={id}
        />
      );
    }
  );

  return (
    <table className="flights-table user-list table table-hover">
      <thead className="thead-light">
        <tr className="table-header">
          <th>Event</th>
          <th>Time</th>
          <th>Directioin</th>
          <th>Flight</th>
          <th>Carrier</th>
          <th>Vehicle</th>
          <th>Days</th>
        </tr>
      </thead>

      <tbody>{users}</tbody>
    </table>
  );
};

export default FightsTable;
