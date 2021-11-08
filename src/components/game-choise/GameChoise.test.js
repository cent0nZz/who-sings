import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import GameChoise from './GameChoise'
import { act } from 'react-dom/test-utils'

let choise
let revealResult
let isDisabled
let onChoiseClickFn
let revealResultTimeMs

beforeEach(() => {
  choise = { artistName: 'mario' }
  revealResult = false
  isDisabled = false
  onChoiseClickFn = jest.fn()
  revealResultTimeMs = 0
})

test('renders correctly, has artist name as innerText, by default is not disabled', () => {
  render(<GameChoise
    choise={choise}
    revealResult={revealResult}
    isDisabled={isDisabled}
    onChoiseClick={onChoiseClickFn}
    revealResultTimeMs={revealResultTimeMs} />)

  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveTextContent(choise.artistName)
  expect(screen.getByRole('button')).not.toBeDisabled()
})

test('is disabled if right prop is passed', () => {
  isDisabled = true

  render(<GameChoise
    choise={choise}
    revealResult={revealResult}
    isDisabled={isDisabled}
    onChoiseClick={onChoiseClickFn}
    revealResultTimeMs={revealResultTimeMs} />)

  expect(screen.getByRole('button')).toBeDisabled()
})

test('does not have the correct-choise class if only the choise is marked as correct', () => {
  choise = { artistName: 'mario', correct: true }

  render(<GameChoise
    choise={choise}
    revealResult={revealResult}
    isDisabled={isDisabled}
    onChoiseClick={onChoiseClickFn}
    revealResultTimeMs={revealResultTimeMs} />)

  expect(screen.getByRole('button')).not.toHaveClass('game-choise--correct')
})

test('does not have the correct-choise class if only the reveal prop is passed as true', () => {
  revealResult = true

  render(<GameChoise
    choise={choise}
    revealResult={revealResult}
    isDisabled={isDisabled}
    onChoiseClick={onChoiseClickFn}
    revealResultTimeMs={revealResultTimeMs} />)

  expect(screen.getByRole('button')).not.toHaveClass('game-choise--correct')
})

test('does have the correct-choise class if both the choise is marked as correct and the reveal prop is passed as true', () => {
  choise = { artistName: 'mario', correct: true }
  revealResult = true

  render(<GameChoise
    choise={choise}
    revealResult={revealResult}
    isDisabled={isDisabled}
    onChoiseClick={onChoiseClickFn}
    revealResultTimeMs={revealResultTimeMs} />)

  expect(screen.getByRole('button')).toHaveClass('game-choise--correct')
})

test('does have the selected-choise class for the specified revealResultTimeMs, and actually calls the onClick callback when clicked on', () => {
  revealResultTimeMs = 1000

  jest.useFakeTimers()

  render(<GameChoise
    choise={choise}
    revealResult={revealResult}
    isDisabled={isDisabled}
    onChoiseClick={onChoiseClickFn}
    revealResultTimeMs={revealResultTimeMs} />)

  fireEvent.click(screen.getByRole('button'))
  act(() => {
    jest.advanceTimersByTime(500)
  })
  expect(onChoiseClickFn).toHaveBeenCalled()
  expect(screen.getByRole('button')).toHaveClass('game-choise--selected')
  act(() => {
    jest.advanceTimersByTime(500)
  })
  expect(screen.getByRole('button')).not.toHaveClass('game-choise--selected')

  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})
