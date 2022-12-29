import * as React from 'react';
import CheckboxWithLabel from './checkbox-with-label';

test('CheckboxWithLabel changes the text after click', () => {
  // Render a checkbox with label in the document
  const checkbox = (<CheckboxWithLabel labelOn='On' labelOff='Off' />) as any;

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
