import React from 'react'
import { render, screen, fireEvent } from '../../redux/test-utils'
import UserStats from './UserStats'
import { act } from 'react-dom/test-utils'

let name
let rank
let overralPoints

beforeEach(() => {
  name = 'mario'
  rank = 1
  overralPoints = 5000
})

test('renders correctly based on properties', () => {
  render(<UserStats
    name={name}
    rank={rank}
    overralPoints={overralPoints} />)

  expect(screen.getByText(name, { exact: false })).toBeInTheDocument()
  expect(screen.getByText(`${rank}°`, { exact: false })).toBeInTheDocument()
  expect(screen.getByText(`${overralPoints}pt`, { exact: false })).toBeInTheDocument()
})

test('does show the You tag if logged in and username matches (same user)', () => {
  render(<UserStats
    name={name}
    rank={rank}
    overralPoints={overralPoints} />, {
    preloadedState: {
      currentUser: {
        isLogged: true,
        name: name,
      }
    }
  })

  expect(screen.getByText('You', { exact: false })).toBeInTheDocument()
})

test('does not show the You tag if logged but with non-matching username', () => {
  render(<UserStats
    name={name}
    rank={rank}
    overralPoints={overralPoints} />, {
    preloadedState: {
      currentUser: {
        isLogged: true,
        name: 'luigi',
      }
    }
  })

  expect(screen.queryByText('You', { exact: false })).not.toBeInTheDocument()
})

test('does not show the You tag if not logged', () => {
  render(<UserStats
    name={name}
    rank={rank}
    overralPoints={overralPoints} />, {
    preloadedState: {
      currentUser: {
        isLogged: false,
        name: name,
      }
    }
  })

  expect(screen.queryByText('You', { exact: false })).not.toBeInTheDocument()
})
