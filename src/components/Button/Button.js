  
import React from 'react';
import './Button.css';

// TODO: add theme {primary? secondary?} option and size {lg, md, sm}
const Button = ({className, children, ...restProps}) => {
  return (
    <button className={`form__button ${className || ''}`} {...restProps}>
      {children}
    </button>
  )
}

export default Button;