export const getAllUsers = () => JSON.parse(localStorage.getItem('who_sings/users') ?? '[]')

export const getUserByName = (name) => getAllUsers().find(user => user.name === name)

export const addUser = (userToAdd) => {
  const users = getAllUsers()

  const userIndex = users.findIndex(user => user.name === userToAdd.name)
  if (userIndex === -1) {
    users.push(userToAdd)
  } else {
    users[userIndex] = userToAdd
  }

  localStorage.setItem('who_sings/users', JSON.stringify(users))
}

export const deleteUser = (userToDelete) => {
  const users = getAllUsers()

  const userIndex = users.findIndex(user => user.name === userToDelete.name)
  if (userIndex !== -1) {
    users.splice(userIndex, 1)
  } else {
    return
  }

  localStorage.setItem('who_sings/users', JSON.stringify(users))
}

export const getAllPlayedGames = (userThatPlayed) => {
  const users = getAllUsers()

  const userIndex = users.findIndex(user => user.name === userThatPlayed.name)
  if (userIndex !== -1) {
    return users[userIndex].playedGames
  } else {
    return null
  }
}

export const addPlayedGame = (playedGame, userThatPlayed) => {
  const users = getAllUsers()

  const userIndex = users.findIndex(user => user.name === userThatPlayed.name)
  if (userIndex !== -1) {
    const playedGames = users[userIndex].playedGames
    playedGames.push({
      id: playedGames.length + 1,
      ...playedGame
    })
  } else {
    return
  }

  localStorage.setItem('who_sings/users', JSON.stringify(users))
}
