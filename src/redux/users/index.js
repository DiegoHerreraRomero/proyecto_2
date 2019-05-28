const NEW_USER = 'NEW_USER'

export const newUser = user => ({
  type: NEW_USER,
  payload: {
    user
  }
})

export default (state = initialState, action) => {
  return ({
    ...state
  })
}

const initialState = {
  currentUser: { id: 1, email: 'diegoh233@gmail.com' },
  users: [
    { id: 1, email: 'diegoh233@gmail.com', favoriteEpisodes: [] }
  ]
}
