import React from 'react';
import Button from './Button';
import './Controls.css';

function Controls(props) {
  const { positionClick } = props;

  return (
    <div className="nback-controls">
      <Button onClick={positionClick}>Position Match</Button>
      <Button>Letter Match</Button>
    </div>
  );
}

export default Controls;