  
import React from 'react';
import './Input.css';

// TODO: add size prop {lg, sm, md}
const Input = ({className, ...restProps}) => {
  return (
    <input className={`form__input ${className || ''}`} {...restProps} />
  )
}

export default Input;