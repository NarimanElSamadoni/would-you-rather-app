import { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Navigation extends Component {
  logout = () => {
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }

  render() {
    const { user } = this.props
    return (
      <Navbar bg="light" variant="light" fixed="top"
        style={{borderBottom: '2px solid #dc3545', color: '#6b6b6d'}}>
        <Navbar.Brand className='p-0 m-0'>
          <img
            src='https://wouldyourather.app/logo/light.png'
            alt='app-logo'
            width={70}
            height={55}
          />
        </Navbar.Brand>
        <Nav className="m-auto nav-links" style={{paddingRight: '5rem'}}>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
          <NavLink to='/add' exact activeClassName='active'>
            New Question
          </NavLink>
          <NavLink to='/leaderboard' exact activeClassName='active'>
            Leader Board
          </NavLink>
        </Nav>
        { user === null
          ? null
          :
          <Navbar.Text>
            Hello, {user.name}
            <img
              src={user.avatarURL}
              alt={`Avatar of ${user.name}`}
              className='round-img-nav' />
            <button
              onClick={this.logout}
              className='nav-button'>
                Logout
              </button>
          </Navbar.Text>
        }
      </Navbar>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  const user = authedUser ? users[authedUser] : null
  return {
    user: user
  }
}

export default connect(mapStateToProps)(Navigation)