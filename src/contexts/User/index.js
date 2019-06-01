import React, { useReducer } from 'react'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const REGISTER = 'REGISTER'
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

export const register = (user) => {
  return {
    type: REGISTER,
    payload: {
      user
    }
  }
}

export const addFavorite = episode => {
  return {
    type: ADD_FAVORITE,
    payload: {
      episode
    }
  }
}

export const removeFavorite = episode => {
  return {
    type: REMOVE_FAVORITE,
    payload: {
      episode
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
    case REGISTER:
      const ids = users.map(u => u.id)
      const newId = Math.max(...ids) + 1
      let { user: newUser } = action.payload
      newUser = {
        ...newUser,
        id: newId,
        favoriteEpisodes: []
      }
      return {
        ...state,
        users: [...users, newUser],
        userLogged: newUser
      }
    case ADD_FAVORITE:
      const newFav = [...userLogged.favoriteEpisodes, action.payload.episode]
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
              favoriteEpisodes: newFav
            }
          }
          return userMod
        })
      }
    case REMOVE_FAVORITE:
      const newNoFav = userLogged.favoriteEpisodes.filter(fe => fe !== action.payload.episode)
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
              favoriteEpisodes: newNoFav
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
    { id: 2, email: 'a@a.cl', password: '12345', favoriteEpisodes: ['S01E01', 'S01E03'] }
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
