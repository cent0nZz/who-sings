export const getRandomInteger = (max) => Math.floor(Math.random() * Math.floor(max) + 1)

export const shuffleArray = (array) => {
  let currentIdx = array.length

  while (currentIdx !== 0) {
    let randIdx = Math.floor(Math.random() * currentIdx)
    currentIdx--

    [array[currentIdx], array[randIdx]] =
      [array[randIdx], array[currentIdx]]
  }

  return array
}
