import React, { useReducer } from 'react'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const ADD_FAVORITE = 'ADD_FAVORITE'
const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const login = ({ email, password }) => {
  return {
    type: LOGIN,
    payload: {
      email,
      password
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
    type: REMOVE_FAVORITE,
    payload: {
      id
    }
  }
}

let reducer = (state, action) => {
  const { userLogged, users } = state
  switch (action.type) {
    case LOGIN:
      const { email, password } = action.payload
      const user = users.filter(u => u.email === email)[0]
      let userLog = null

      if (user !== undefined && user !== null && user.password === password) {
        userLog = user
      }
      return {
        ...state,
        userLogged: userLog
      }
    case LOGOUT:
      return {
        ...state,
        userLogged: null
      }
    case ADD_FAVORITE:
      const newFav = [...userLogged.favoriteEpisodes, action.payload.id]
      return {
        ...state,
        userLogged: {
          ...userLogged,
          favoriteEpisodes: newFav
        },
        users: users.map(user => {
          let userMod = user
          if (user.id === userLogged.id) {
            userMod = {
              ...userMod,
              favoritesEpisodes: newFav
            }
          }
          return userMod
        })
      }
    case REMOVE_FAVORITE:
      const newNoFav = userLogged.favoriteEpisodes.filter(fe => fe !== action.payload.id)
      console.log(newNoFav)
      return {
        ...state,
        userLogged: {
          ...userLogged,
          favoriteEpisodes: newNoFav
        },
        users: users.map(user => {
          let userMod = user
          if (user.id === userLogged.id) {
            userMod = {
              ...userMod,
              favoritesEpisodes: newNoFav
            }
          }
          return userMod
        })
      }
    default:
      return state
  }
}

const initialState = {
  userLogged: null,
  users: [
    { id: 1, email: 'diegoh233@gmail.com', password: '12345', favoriteEpisodes: [] },
    { id: 12, email: 'a@a.cl', password: '12345', favoriteEpisodes: [1, 3] }
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
