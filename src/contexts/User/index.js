import React, { useReducer } from 'react'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const ADD_FAVORITE = 'ADD_FAVORITE'
const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const login = (user, pass) => {
  return {
    type: LOGIN,
    payload: {
      user,
      pass
    }
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {}
  }
}

export const addFavorite = id => {
  return {
    type: ADD_FAVORITE,
    payload: {
      id
    }
  }
}

export const removeFavorite = id => {
  return {
    type: ADD_FAVORITE,
    payload: {
      id
    }
  }
}

let reducer = (state, action) => {
  let { userLogged, users } = state
  switch (action.type) {
    case LOGIN:
      const { email, pass } = action.payload
      const user = users.filter(u => u.email === email)[0]

      let userLogged = null

      if (user !== undefined && user !== null && user.password === pass) {
        userLogged = user
      }
      return {
        ...state,
        userLogged: userLogged
      }
    case LOGOUT:
      return {
        ...state,
        userLogged: null
      }
    case ADD_FAVORITE:
      userLogged = {
        ...userLogged,
        favoriteEpisodes: [...userLogged.favoriteEpisodes, action.payload.id]
      }
      users = users.map(user => {
        let userMod = user
        if (user.id === userLogged.id) {
          userMod = {
            ...userMod,
            favoritesEpisodes: userLogged.favoriteEpisodes
          }
        }
        return userMod
      })
      return {
        ...state,
        userLogged,
        users
      }
    case REMOVE_FAVORITE:
      userLogged = {
        ...userLogged,
        favoriteEpisodes: userLogged.favoriteEpisodes.filter(fe => fe !== action.payload.id)
      }
      users = users.map(user => {
        let userMod = user
        if (user.id === userLogged.id) {
          userMod = {
            ...userMod,
            favoritesEpisodes: userLogged.favoriteEpisodes
          }
        }
        return userMod
      })
      return {
        ...state,
        userLogged,
        users
      }
    default:
      return state
  }
}

const initialState = {
  userLogged: { id: 1, email: 'diegoh233@gmail.com', password: '12345', favoriteEpisodes: [] },
  users: [
    { id: 1, email: 'diegoh233@gmail.com', password: '12345', favoriteEpisodes: [] }
  ]
}

const UserContext = React.createContext(initialState)

function UserProvider (props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
