import React from 'react';
import './Button.css';

function Button(props) {
  const { children, onClick } = props;

  return (
    <button onClick={onClick} className="nback-button">
      {children}
    </button>
  );
}

export default Button;