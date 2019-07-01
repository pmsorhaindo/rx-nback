import React from 'react';
import Cell from './Cell';
import './Display.css';

function Display(props) {
  const { selectedCell } = props;
  const array = Array.apply(null, {length: 9}).map(Number.call, Number)
  console.log('selected cell', selectedCell);
  return (
    <div className="nback-display">
      { array.map((_, i)=> (
        <Cell key={`key-${i}`} selected={i === selectedCell} />
      ) ) }
    </div>
  );
}

export default Display;