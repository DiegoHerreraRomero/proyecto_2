import React, { useContext, useState } from 'react'
import { Jumbotron, Form, Button } from 'react-bootstrap'
import {
  UserContext,
  register as RegisterDispatch
} from '../../../contexts/User'

const defaultTempUser = {
  email: '',
  password: '',
  passwordConfirm: ''
}

export default function UserLogin () {
  const { state, dispatch } = useContext(UserContext)
  const { users } = state
  const [ tempUser, setTempUser ] = useState(defaultTempUser)
  const [ errors, setErrors ] = useState({})

  const updateTempUser = e => {
    setTempUser({
      ...tempUser,
      [e.target.name]: e.target.value
    })
  }

  const submitRegister = e => {
    e.preventDefault()
    let newErrors = {}
    let valid = true
    if (tempUser.email === '') {
      newErrors = {
        ...newErrors,
        email: 'Should not be blank'
      }
      valid = false
    } else if (users !== undefined && users.filter(u => u.email === tempUser.email).length > 0) {
      newErrors = {
        ...newErrors,
        email: 'Already exist'
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
    if (tempUser.passwordConfirm === '') {
      newErrors = {
        ...newErrors,
        passwordConfirm: 'Should not be blank'
      }
      valid = false
    } else if (tempUser.passwordConfirm !== tempUser.password) {
      newErrors = {
        ...newErrors,
        passwordConfirm: 'Should be the same password'
      }
      valid = false
    } else {
      newErrors = {
        ...newErrors,
        passwordConfirm: null
      }
    }
    if (valid) {
      dispatch(RegisterDispatch(tempUser))
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <Jumbotron>
      <Form onSubmit={submitRegister}>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' name='email' placeholder='Enter email' onChange={updateTempUser} value={tempUser.email} />
          {errors.email && (
            <Form.Text className='text-muted'>
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

        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Password Confirm</Form.Label>
          <Form.Control type='password' name='passwordConfirm' placeholder='Password Confirm' onChange={updateTempUser} value={tempUser.passwordConfirm} />
          {errors.passwordConfirm && (
            <Form.Text className='text-muted'>
              <p className='text-danger'>{errors.passwordConfirm}</p>
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
