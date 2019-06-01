import React, { useContext } from 'react'
import { UserContext } from '../../../contexts/User'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute ({ component: Component, ...rest }) {
  const { state } = useContext(UserContext)
  const { userLogged } = state
  console.log('userLogged', userLogged)
  console.log('validation', userLogged === null)
  return (
    <Route
      {...rest}
      render={props => {
        if (userLogged !== null) {
          return <Component {...props} />
        } else {
          return <Redirect to='/login' />
        }
      }}
    />
  )
}
