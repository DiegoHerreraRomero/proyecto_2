import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'
import EpisodesTable from '../Episodes/Table'
import CharactersTable from '../Characters/Table'
import MatchPeople from '../Users/MatchPeople'
import UserLogin from '../Users/Login'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import {
  UserContext,
  logout as LogoutDispatch
} from '../../contexts/User'

const Homepage = () => {
  return (
    <h5>Home</h5>
  )
}

function Template (props) {
  const { state, dispatch } = useContext(UserContext)
  const { userLogged } = state

  const SignOut = () => {
    dispatch(LogoutDispatch())
    return (
      <Redirect to='/login' />
    )
  }

  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {userLogged !== null && (
            <Nav className='mr-auto'>
              <NavLink exact to='/' className='nav-link'>Home</NavLink>
              <NavLink exact to='/episodes' className='nav-link'>Episodes</NavLink>
              <NavLink exact to='/characters' className='nav-link'>Characters</NavLink>
              <NavLink exact to='/match_people' className='nav-link'>Match People</NavLink>
            </Nav>
          )}
          {userLogged === null && (
            <Nav className='mr-auto'>
              <NavLink exact to='/' className='nav-link'>Home</NavLink>
            </Nav>
          )}
          <Nav>
            {userLogged !== null && (
              <NavDropdown alignRight title={userLogged.email} id='user-dropdown'>
                <NavLink exact to='/my_account' className='dropdown-item'>My Account</NavLink>
                <NavDropdown.Divider />
                <NavLink exact to='/sign_out' className='dropdown-item'>Sign Out</NavLink>
              </NavDropdown>
            )}
            {userLogged === null && (
              <NavDropdown alignRight title='User' id='user-dropdown'>
                <NavLink exact to='/login' className='dropdown-item'>Login</NavLink>
                <NavLink exact to='/register' className='dropdown-item'>Register</NavLink>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/episodes' component={EpisodesTable} />
          <Route exact path='/characters' component={CharactersTable} />
          <Route exact path='/match_people' component={MatchPeople} />
          <Route exact path='/login' component={UserLogin} />
          <Route exact path='/sign_out' component={SignOut} />
        </Switch>
      </Container>
    </Router>
  )
}

export default Template
