import React from 'react';

import './flight-item.css';

const FlightItem = ({ id, ...props }) => {
  return (
    <tr className='flight-item'>
      <td>{props.event}</td>
      <td>{props.time}</td>
      <td>{props.direction}</td>
      <td>{props.flight}</td>
      <td>{props.carrier}</td>
      <td>{props.vehicle}</td>
      <td>{props.days}</td>
    </tr>
  );
};

export default FlightItem;
