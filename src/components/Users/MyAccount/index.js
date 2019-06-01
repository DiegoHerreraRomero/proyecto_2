import React, { useContext, useState } from 'react'
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap'
import {
  UserContext,
  updateUser as UpdateUserDispatch
} from '../../../contexts/User'

const defaultTempUser = {
  currentPassword: '',
  password: '',
  passwordConfirm: ''
}

export default function MyAccount () {
  const { state, dispatch } = useContext(UserContext)
  const { userLogged } = state
  const [ tempUser, setTempUser ] = useState(defaultTempUser)
  const [ errors, setErrors ] = useState({})
  const [ save, setSave ] = useState(null)

  const updateTempUser = e => {
    setTempUser({
      ...tempUser,
      [e.target.name]: e.target.value
    })
  }

  const submitUpdate = e => {
    e.preventDefault()
    let newErrors = {}
    let valid = true
    if (tempUser.currentPassword === '') {
      newErrors = {
        ...newErrors,
        currentPassword: 'Should not be blank'
      }
      valid = false
    } else if (userLogged.password !== tempUser.currentPassword) {
      newErrors = {
        ...newErrors,
        currentPassword: 'Wrong current password'
      }
      valid = false
    } else {
      newErrors = {
        ...newErrors,
        currentPassword: null
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
      dispatch(UpdateUserDispatch(tempUser))
      setTempUser(defaultTempUser)
      setErrors({})
      setSave('success')
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <Jumbotron>
      {save && (<Alert variant={save}>Correctly saved</Alert>)}
      <Form onSubmit={submitUpdate}>
        <Form.Group controlId='currentPassword'>
          <Form.Label>Current Password</Form.Label>
          <Form.Control type='password' name='currentPassword' placeholder='Current Password' onChange={updateTempUser} value={tempUser.currentPassword} />
          {errors.currentPassword && (
            <Form.Text className='text-muted'>
              <p className='text-danger'>{errors.currentPassword}</p>
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
