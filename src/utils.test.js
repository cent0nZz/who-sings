import { shuffleArray } from './utils'

test('shuffleArray returns a swapped array', () => {
  const array = [1, 5, 9, 12, 30]
  const newArray = shuffleArray([...array])

  expect(array).not.toEqual(newArray)
})

test('shuffleArray does modify original array', () => {
  const array = [1, 5, 9, 12, 30]
  const newArray = shuffleArray(array)

  expect(array).toEqual(newArray)
})
