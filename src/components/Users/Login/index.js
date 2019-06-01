import React, { useContext, useState } from 'react'
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap'
import {
  UserContext,
  login as LoginDispatch
} from '../../../contexts/User'

export default function UserLogin () {
  const { state, dispatch } = useContext(UserContext)
  const { users } = state
  const [ tempUser, setTempUser ] = useState({ email: '', password: '' })
  const [ errors, setErrors ] = useState({ global: null, email: null, password: null })

  const updateTempUser = e => {
    setTempUser({
      ...tempUser,
      [e.target.name]: e.target.value
    })
  }

  const submitLogin = e => {
    e.preventDefault()
    let newErrors = {}
    let valid = true
    let user = null
    if (tempUser.email === '') {
      newErrors = {
        ...newErrors,
        email: 'Should not be blank'
      }
      valid = false
    } else {
      newErrors = {
        ...newErrors,
        email: null
      }
    }
    if (tempUser.password === '') {
      newErrors = {
        ...newErrors,
        password: 'Should not be blank'
      }
      valid = false
    } else {
      newErrors = {
        ...newErrors,
        password: null
      }
    }
    if (valid) {
      if (users === undefined) {
        newErrors = {
          ...newErrors,
          global: 'Wrong email and/or password'
        }
        valid = false
      } else {
        user = users.filter(u => u.email === tempUser.email)[0]
        if (user === undefined || user.password !== tempUser.password) {
          newErrors = {
            ...newErrors,
            global: 'Wrong email and/or password'
          }
          valid = false
        } else {
          newErrors = {
            ...newErrors,
            global: null
          }
        }
      }
    }
    if (valid) {
      dispatch(LoginDispatch(user))
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <Jumbotron>
      {errors.global && (<Alert variant='warning'>{errors.global}</Alert>)}
      <Form onSubmit={submitLogin}>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' name='email' placeholder='Enter email' onChange={updateTempUser} value={tempUser.email} />
          {errors.email && (
            <Form.Text className='text-muted text-danger'>
              <p className='text-danger'>{errors.email}</p>
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' placeholder='Password' onChange={updateTempUser} value={tempUser.password} />
          {errors.password && (
            <Form.Text className='text-muted'>
              <p className='text-danger'>{errors.password}</p>
            </Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Jumbotron>
  )
}
