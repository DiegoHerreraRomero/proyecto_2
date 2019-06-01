import React, { useContext } from 'react'
import { UserContext } from '../../../contexts/User'
import { Route, Redirect } from 'react-router-dom'

export default function PublicRoute ({ component: Component, ...rest }) {
  const { state } = useContext(UserContext)
  const { userLogged } = state
  return (
    <Route
      {...rest}
      render={props => {
        if (userLogged !== null) {
          return <Redirect to='/' />
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}
