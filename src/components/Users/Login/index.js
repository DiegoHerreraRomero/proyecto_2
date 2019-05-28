import React, { useContext, useState } from 'react'
import { Jumbotron, Form, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import {
  UserContext,
  login as LoginDispatch
} from '../../../contexts/User'

export default function UserLogin () {
  const { state, dispatch } = useContext(UserContext)
  const [ tempUser, setTempUser ] = useState({})

  const updateTempUser = e => {
    setTempUser({
      ...tempUser,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = e => {
    e.preventDefault()
    dispatch(LoginDispatch(tempUser.email, tempUser.password))
    return (
      <Router>
        <Redirect to='/' />
      </Router>
    )
  }


  console.log(tempUser)

  return (
    <Jumbotron>
      <Form onSubmit={submitLogin}>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' name='email' placeholder='Enter email' onChange={updateTempUser} />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' onChange={updateTempUser} />
        </Form.Group>
        <Form.Group controlId='formBasicChecbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Jumbotron>
  )
}
