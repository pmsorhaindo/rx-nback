import React from 'react';
import Button from './Button';
import './Controls.css';

function Controls(props) {
  const { letterClick, positionClick } = props;

  return (
    <div className="nback-controls">
      <Button onClick={positionClick}>Position Match</Button>
      <Button onClick={letterClick}>Letter Match</Button>
    </div>
  );
}

export default Controls;