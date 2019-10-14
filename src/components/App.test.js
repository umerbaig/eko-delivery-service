import React from 'react';
import { shallow } from 'enzyme';
import {Graph, seedGraphData} from '../utils/graph';
import App from './App';

it('should have default tab as 0', () => {
  const app = shallow(<App />);
  expect(
    app.find('.app__header--active').text()
  ).toEqual('Calculate Delivery Cost');
  expect(app.find('DeliveryCostTab').exists()).toEqual(true);
});

it('should set second tab when clicked on second button', () => {
  const app = shallow(<App />);
  app.find('.app__header').childAt(1).simulate('click'); // set second tab
  expect(
    app.find('.app__header--active').text()
  ).toEqual('Calculate Possible Delivery Routes');
  expect(app.find('DeliveryRoutesTab').exists()).toEqual(true);
});

it('should set third tab when clicked on third button', () => {
  const app = shallow(<App />);
  app.find('.app__header').childAt(2).simulate('click'); // set second tab
  expect(
    app.find('.app__header--active').text()
  ).toEqual('Add More Routes');
  expect(app.find('AddRoutesTab').exists()).toEqual(true);
});

it('should render graph with default data', () => {
  const graph = new Graph(seedGraphData);
  const app = shallow(<App />);
  const graphData = app.find('Graph').prop('data');
  expect(graphData.nodes.length).toEqual(graph.getNodes().length);
  expect(graphData.links.length).toEqual(graph.getLinks().length);
});

it('should update the graph when new node is added to graph', () => {
  const defaultGraph = new Graph(seedGraphData);
  const app = shallow(<App />);
  // Select tab 3 (Add more routes)
  app.find('.app__header').childAt(2).simulate('click'); // set second tab
  const graph = app.find('AddRoutesTab').prop('graph');
  graph.addLink('A', 'G', 2);
  app.find('AddRoutesTab').prop('onNodeAdded')();// Manually trigger if a route is added
  const graphData = app.find('Graph').prop('data');
  expect(graphData.links.length).toEqual(defaultGraph.getLinks().length + 1);
});