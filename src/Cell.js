

import React from 'react';
import './Cell.css';

function Cell(props) {
  return (
    <div className="cell-container">
      <div className="cell">
        <div className={`block ${!props.selected ? 'block--hidden' : ''}`} />
      </div>
    </div>
  );
}

export default Cell;
