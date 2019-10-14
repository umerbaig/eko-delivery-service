import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './style.css';

const AddRoutesTab = ({graph, onNodeAdded}) => {
  const [source, setSource] = React.useState('');
  const [target, setTarget] = React.useState('');
  const [success, setSucces] = React.useState(false);
  const [cost, setCost] = React.useState(1);
  const isValid = (val) => /^[A-Z]$/.test(val); // Accepts only singular capital alphabet
  const onFormSubmit = (e) => {
    e.preventDefault();
    graph.addLink(source, target, cost);  
    setSucces(true);
    onNodeAdded(); // Notify parent component to re render the graph

    setTimeout(() => {
      setSucces(false)
      setSource('');
      setTarget('');
      setCost(1);
    }, 2000);
  }

  return (
    <div className="tab__content">
      <h4>To Calculate possible routes, please fill out the following:</h4>

      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label htmlFor="source">From Location:</label>
          <Input
            type="text" id="source" name="source"
            value={source} onChange={({target: {value}}) => setSource(value)}
          />
          {source && !isValid(source) && (
            <p className="error-message">Please enter a capital alphabet!</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="destination">To Location:</label>
          <Input
            type="text" id="destination" name="destination"
            value={target} onChange={({target: {value}}) => setTarget(value)}
          />
          {target && !isValid(target) && (
            <p className="error-message">Please enter a capital alphabet!</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cost">Cost:</label>
          <Input
            type="number" id="cost" name="cost"
            value={cost} onChange={({target: {value}}) => setCost(parseInt(value))}
          />
          {cost < 0 && (
            <p className="error-message">Please enter a value greater or equal to 0!</p>
          )}
        </div>

        <div className="form-btn-wrapper">
          <Button
            type="submit"
            disabled={success || !source || !target || !isValid(target) || !isValid(source)}
          >
            ADD ROUTE
          </Button>
        </div>
      </form>

      <br/>

      {success && (
        <h4>Route added successfully!</h4>
      )}
    </div>
  )
}

export default AddRoutesTab;