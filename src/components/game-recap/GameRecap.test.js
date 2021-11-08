import React from 'react'
import { render, screen } from '@testing-library/react'
import GameRecap from './GameRecap'

test('renders game recap with correct properties', () => {
  const points = 150
  const time = 60
  const numCorrectChoises = 3
  const totalChoises = 5

  render(<GameRecap points={points} time={time} numCorrectChoises={numCorrectChoises} totalChoises={totalChoises} />)

  expect(screen.getByText(`${points}pt`, { exact: false })).toBeInTheDocument()
  expect(screen.getByText(`${numCorrectChoises}/${totalChoises}`, { exact: false })).toBeInTheDocument()
  expect(screen.getByText(`${time}"`, { exact: false })).toBeInTheDocument()
})
