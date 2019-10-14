import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './style.css';

const DeliveryRoutesTab = ({graph}) => {
  const [source, setSource] = React.useState('');
  const [target, setTarget] = React.useState('');
  const [maxStops, setMaxStops] = React.useState(15);
  const [routes, setPossibleRoutes] = React.useState([]);
  const isValid = (val) => /^[A-Z]$/.test(val); // Accepts only singular capital alphabet
  const onFormSubmit = (e) => {
    e.preventDefault();
    const calcRoutes = graph.calculatePossibleRoutes(source, target);  

    // Filter the routes based on max stops
    // Stops are excluded of starting & ending points
    setPossibleRoutes(calcRoutes.filter((obj) => {
      return obj.route.length <= ((parseInt(maxStops) || 15) + 2)
    }));
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
          <label htmlFor="stops">Max Stops:</label>
          <Input
            type="number" id="stops" name="stops"
            value={maxStops} onChange={({target: {value}}) => setMaxStops(value)}
          />
          {maxStops < 0 && (
            <p className="error-message">Please enter a value greater than 0!</p>
          )}
        </div>

        <div className="form-btn-wrapper">
          <Button
            type="submit"
            disabled={!source || !target || (!maxStops || maxStops < 0) || !isValid(target) || !isValid(source)}
          >
            CALCULATE ROUTES
          </Button>
        </div>
      </form>

      <br/>

      {!!routes.length && (
        <div>
          <h4>Your possible routes are:</h4>
          <ul className="routes-list">
            {routes.map((obj, idx) => (
              <li key={idx}>
                Route <strong>{obj.route}</strong> has cost of {obj.cost}
                {idx === 0 && (
                  <span>cheapest</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!routes.length && (
        <h4>No routes exist in Eko Network for your selection!</h4>
      )}
    </div>
  )
}

export default DeliveryRoutesTab;