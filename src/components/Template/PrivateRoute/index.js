import React, { useContext } from 'react'
import { UserContext } from '../../../contexts/User'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute ({ component: Component, ...rest }) {
  const { state } = useContext(UserContext)
  const { userLogged } = state
  return (
    <Route
      {...rest}
      render={props => {
        if (userLogged !== undefined && userLogged !== null) {
          return <Component {...props} />
        } else {
          return <Redirect to='/login' />
        }
      }}
    />
  )
}
