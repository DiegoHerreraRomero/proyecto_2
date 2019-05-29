import React, { useContext } from 'react'
import { UserContext } from '../../../../contexts/User'
import { BrowserRouter as Redirect } from 'react-router-dom'

export default function IsLoggedIn () {
  const { state, payload } = useContext(UserContext)
  const { userLogged } = state

  if (userLogged !== null) {
    return (
      <Redirect to='/episodes' />
    )
  }

  return ''
}
