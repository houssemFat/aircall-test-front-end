import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


test('renders learn react link', () => {
  const app = render(<App/>);
  const someElement: HTMLElement | null = app.container.querySelector('#footer_i18n_usa');
  // @ts-ignore
  fireEvent.click(someElement);
  const element = screen.getByText (/Bonjour/i);
  expect(element).toBeInTheDocument()
});
