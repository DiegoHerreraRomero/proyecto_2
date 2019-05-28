import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import EpisodesTable from '../../components/Episodes/Table'
import CharactersTable from '../../components/Characters/Table'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const Homepage = () => {
  return (
    <h5>Home</h5>
  )
}

function Template (props) {
  const { currentUser } = props
  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <NavLink exact to='/' className='nav-link'>Home</NavLink>
            <NavLink exact to='/episodes' className='nav-link'>Episodes</NavLink>
            <NavLink exact to='/characters' className='nav-link'>Characters</NavLink>
          </Nav>
          <Nav>
            <NavDropdown alignRight title={currentUser.email} id='user-dropdown'>
              <NavLink exact to='/my_account' className='dropdown-item'>My Account</NavLink>
              <NavDropdown.Divider />
              <NavLink exact to='/sign_out' className='dropdown-item'>Sign Out</NavLink>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        <Container>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/episodes' component={EpisodesTable} />
          <Route exact path='/characters' component={CharactersTable} />
        </Container>
      </Switch>
    </Router>
  )
}

export default Template
