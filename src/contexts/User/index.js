import React, { useReducer } from 'react'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const REGISTER = 'REGISTER'
const UPDATE_USER = 'UPDATE_USER'
const ADD_FAVORITE_EPISODE = 'ADD_FAVORITE_EPISODE'
const REMOVE_FAVORITE_EPISODE = 'REMOVE_FAVORITE_EPISODE'
const ADD_FAVORITE_CHARACTER = 'ADD_FAVORITE_CHARACTER'
const REMOVE_FAVORITE_CHARACTER = 'REMOVE_FAVORITE_CHARACTER'

export const login = (user) => {
  return {
    type: LOGIN,
    payload: {
      user
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

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      user
    }
  }
}

export const addFavoriteEpisode = episode => {
  return {
    type: ADD_FAVORITE_EPISODE,
    payload: {
      episode
    }
  }
}

export const removeFavoriteEpisode = episode => {
  return {
    type: REMOVE_FAVORITE_EPISODE,
    payload: {
      episode
    }
  }
}

export const addFavoriteCharacter = character => {
  return {
    type: ADD_FAVORITE_CHARACTER,
    payload: {
      character
    }
  }
}

export const removeFavoriteCharacter = character => {
  return {
    type: REMOVE_FAVORITE_CHARACTER,
    payload: {
      character
    }
  }
}

const setLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state)
    window.localStorage.setItem('state', serializedState)
    return state
  } catch (err) {
    console.log('Error on localstorage')
    return state
  }
}

const getLocalStorage = () => {
  try {
    const serializedState = window.localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

let reducer = (state, action) => {
  const { userLogged, users } = state
  switch (action.type) {
    case LOGIN:
      return setLocalStorage({
        ...state,
        userLogged: action.payload.user
      })
    case LOGOUT:
      return setLocalStorage({
        ...state,
        userLogged: null
      })
    case REGISTER:
      let listUsers = []
      if (users !== undefined) {
        listUsers = users
      }
      const ids = listUsers.map(u => u.id)
      let newId = 1
      if (ids.length > 0) {
        newId = Math.max(...ids) + 1
      }
      let { user: newUser } = action.payload
      newUser = {
        id: newId,
        email: newUser.email,
        password: newUser.password,
        favoriteEpisodes: [],
        favoriteCharacters: []
      }
      return setLocalStorage({
        ...state,
        users: [...listUsers, newUser],
        userLogged: newUser
      })
    case UPDATE_USER:
      return setLocalStorage({
        ...state,
        userLogged: {
          ...userLogged,
          password: action.payload.user.password
        },
        users: users.map(user => {
          let userMod = user
          if (user.id === userLogged.id) {
            userMod = {
              ...userMod,
              password: action.payload.user.password
            }
          }
          return userMod
        })
      })
    case ADD_FAVORITE_EPISODE:
      const newFavEpisode = [...userLogged.favoriteEpisodes, action.payload.episode]
      return setLocalStorage({
        ...state,
        userLogged: {
          ...userLogged,
          favoriteEpisodes: newFavEpisode
        },
        users: users.map(user => {
          let userMod = user
          if (user.id === userLogged.id) {
            userMod = {
              ...userMod,
              favoriteEpisodes: newFavEpisode
            }
          }
          return userMod
        })
      })
    case REMOVE_FAVORITE_EPISODE:
      const newNoFavEpisode = userLogged.favoriteEpisodes.filter(fe => fe !== action.payload.episode)
      return setLocalStorage({
        ...state,
        userLogged: {
          ...userLogged,
          favoriteEpisodes: newNoFavEpisode
        },
        users: users.map(user => {
          let userMod = user
          if (user.id === userLogged.id) {
            userMod = {
              ...userMod,
              favoriteEpisodes: newNoFavEpisode
            }
          }
          return userMod
        })
      })
    case ADD_FAVORITE_CHARACTER:
      const newFavCharacter = [...userLogged.favoriteCharacters, action.payload.character]
      return setLocalStorage({
        ...state,
        userLogged: {
          ...userLogged,
          favoriteCharacters: newFavCharacter
        },
        users: users.map(user => {
          let userMod = user
          if (user.id === userLogged.id) {
            userMod = {
              ...userMod,
              favoriteCharacters: newFavCharacter
            }
          }
          return userMod
        })
      })
    case REMOVE_FAVORITE_CHARACTER:
      const newNoFavCharacter = userLogged.favoriteCharacters.filter(fe => fe !== action.payload.character)
      return setLocalStorage({
        ...state,
        userLogged: {
          ...userLogged,
          favoriteCharacters: newNoFavCharacter
        },
        users: users.map(user => {
          let userMod = user
          if (user.id === userLogged.id) {
            userMod = {
              ...userMod,
              favoriteCharacters: newNoFavCharacter
            }
          }
          return userMod
        })
      })
    default:
      return state
  }
}

const initialState = getLocalStorage()

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
