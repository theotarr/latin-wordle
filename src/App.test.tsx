import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Latin Word Game title', () => {
  render(<App />)
  const titleElement = screen.getByText(/Latin Word Game/i)
  expect(titleElement).toBeInTheDocument()
})
