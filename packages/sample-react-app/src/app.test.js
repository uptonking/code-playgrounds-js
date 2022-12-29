import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';

test('render app default home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/github repo/i);
  expect(linkElement).toBeInTheDocument();
});
