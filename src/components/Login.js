import { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Card, Form, FormGroup } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    user: '',
    isDisabled: true,
    toHome: false
  }

  handleChange = (e) => {
    const id = e.target.value
    console.log(id)

    this.setState((currState) => ({
      ...currState,
      user: id,
      isDisabled: (id === '')
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(setAuthedUser(this.state.user))

    this.setState(() => ({
      user: '',
      isDisabled: true,
      toHome: true
    }))
  }

  render() {
    const { users } = this.props
    const { isDisabled, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <Card style={{ width: '70%', margin: 'auto' }}>
        <Card.Header className='text-center'>
          <h4>Welcome to the Would You Rather App! </h4>
          <Card.Text>
            Please Sign in to continue
          </Card.Text>
        </Card.Header>
        <Card.Body>
          <img
            className='app-img'
            src='https://wouldyourather.app/logo/light.png'
            alt='App-Logo'
          />
          <Card.Title className='text-center mt-2'>
            <h3>Sign in</h3>
          </Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup controlId='user'>
              <Form.Control
                as='select'
                defaultValue=''
                onChange={this.handleChange}>
                <option disabled value=''>Select User</option>
                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </Form.Control>
            </FormGroup>
            <button
              type='submit'
              className='btn btn-danger card-button'
              disabled={isDisabled}>
              Sign In
            </button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users).map((u) => {
      return { id: users[u].id, name: users[u].name }
    })
  }
}

export default connect(mapStateToProps)(Login)