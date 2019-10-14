import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './style.css';

const DeliveryCostTab = ({graph}) => {
  const [route, setRoute] = React.useState('');
  const [cost, setCost] = React.useState(null);
  const isValid = /^[A-Z]+$/.test(route);
  const onFormSubmit = (e) => {
    e.preventDefault();
    const calcCost = graph.calculateRouteCost(route);  
    setCost(calcCost);
  }

  return (
    <div className="tab__content">
      <h4>To Calculate cost of your route, please enter your route:</h4>
      <br/>
      <p>For example: ABE</p>

      <form onSubmit={onFormSubmit} noValidate={true}>
        <div className="form-group">
          <label htmlFor="route">Route:</label>
          <Input 
            type="text" id="route" label="source"
            value={route}
            onChange={({target: {value}}) => setRoute(value)}
          />

          {route && !isValid && (
            <p className="error-message">Please enter capital alphabets only!</p>
          )}
        </div>

        <div className="form-btn-wrapper">
          <Button type="submit" disabled={!route || !isValid}>CALCULATE COST</Button>
        </div>
      </form>

      <br/>

      {!!cost && !isNaN(cost) && (
        <h4>Your route's cost is: {cost}</h4>
      )}

      {!cost && isNaN(cost) && (
        <h4>Your route doesn't exist in Eko Network</h4>
      )}
    </div>
  )
}

export default DeliveryCostTab;