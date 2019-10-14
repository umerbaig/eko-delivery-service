import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

it('should render input with a class', () => {
  const input = shallow(<Button />);
  expect(input.hasClass('form__button')).toEqual(true);
});

it('should render input with a default + custom class', () => {
  const input = shallow(<Button className="test" />);
  expect(input.hasClass('form__button test')).toEqual(true);
});