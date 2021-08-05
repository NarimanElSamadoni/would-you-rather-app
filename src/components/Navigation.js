import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg="light" variant="light" fixed="top"
      style={{borderBottom: '2px solid #dc3545', color: '#6b6b6d'}}>
      <Navbar.Brand style={{color: '#6b6b6d'}}>
        Would You Rather?
      </Navbar.Brand>
      <Nav className="m-auto nav-links">
        <NavLink to='/' exact activeClassName='active'>
          Home
        </NavLink>
        <NavLink to='/new' exact activeClassName='active'>
          New Question
        </NavLink>
        <NavLink to='/leaderboard' exact activeClassName='active'>
          Leader Board
        </NavLink>
      </Nav>
    </Navbar>
  )
}

export default Navigation