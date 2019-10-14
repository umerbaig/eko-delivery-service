  
import React from 'react';
import { shallow } from 'enzyme';
import {Graph, seedGraphData} from '../../utils/graph';
import AddRoutesTab from './AddLinksTab';

it('input cost should have default of 1', () => {
  const wrapper = shallow(<AddRoutesTab />);
  expect(
    wrapper.find('#cost').prop('value')
  ).toEqual(1);
});

it('input source, target should have default of empty', () => {
  const wrapper = shallow(<AddRoutesTab />);
  expect(
    wrapper.find('#source').prop('value')
  ).toEqual('');
  expect(
    wrapper.find('#destination').prop('value')
  ).toEqual('');
});

it('should show error when source input has inlvalid value', () => {
  const wrapper = shallow(<AddRoutesTab />);
  wrapper.find('#source').simulate('change', {target: {value: 'e'}})
  expect(
    wrapper.find('.error-message').exists()
  ).toEqual(true)
});

it('should show error when destination input has inlvalid value', () => {
  const wrapper = shallow(<AddRoutesTab />);
  wrapper.find('#destination').simulate('change', {target: {value: 'e'}})
  expect(
    wrapper.find('.error-message').exists()
  ).toEqual(true)
});

it('should have submit button disabled initially', () => {
  const wrapper = shallow(<AddRoutesTab />);
  expect(
    wrapper.find('Button').prop('disabled')
  ).toEqual(true)
});

it('should add graph link when form submit and reset values', () => {
  const graph = new Graph(seedGraphData);
  const mockFn = jest.fn(() => 1);
  const wrapper = shallow(<AddRoutesTab onNodeAdded={mockFn} graph={graph} />);
  wrapper.find('#source').simulate('change', {target: {value: 'A'}})
  wrapper.find('#destination').simulate('change', {target: {value: 'G'}})
  jest.useFakeTimers()

  expect(graph.getLinks().length).toEqual(10)
  expect(graph.getNodes().length).toEqual(6)

  wrapper.find('form').simulate('submit', {preventDefault: () => 1})

  expect(graph.getLinks().length).toEqual(11)
  expect(mockFn.mock.calls.length).toEqual(1)
  expect(graph.getNodes().length).toEqual(7)

  // Mimic if setTimeout was called
  jest.runAllTimers();

  // Shoudl reset the values after form submit
  expect(
    wrapper.find('#destination').prop('value')
  ).toEqual('');
  expect(
    wrapper.find('#source').prop('value')
  ).toEqual('');
  expect(
    wrapper.find('#cost').prop('value')
  ).toEqual(1);
});