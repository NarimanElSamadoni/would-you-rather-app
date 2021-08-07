import { Component } from 'react'
import { Card, Form } from 'react-bootstrap'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    isDisabled: true
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState((currState) => ({
      ...currState,
      [name]: value,
    }))
    this.validateInput(name, value)
  }

  validateInput = (name, value) => {
    let flag = true
    if (value !== ''
      && (this.state.optionOne !== '' || (this.state.optionOne === '' && name === 'optionOne' && value !== ''))
      && (this.state.optionTwo !== '' || (this.state.optionTwo === '' && name === 'optionTwo' && value !== ''))) {
        flag = false
      }
    this.setState((currState) => ({
      ...currState,
      isDisabled: flag
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      isDisabled: true
    }))
  }

  render() {
    const { optionOne, optionTwo } = this.state
    return (
      <Card style={{ width: '70%', margin: 'auto' }}>
        <Card.Header>
          <h4 className='text-center mb-0'>Create New Question</h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Complete the question:
            </Card.Text>
          <Card.Title>
            Would you rather ...
            </Card.Title>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className='mb-3' controlId='optionOne'>
              <Form.Control
                type='text'
                placeholder='Enter Option One Text Here'
                name='optionOne'
                value={optionOne}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className='separator mb-3 font-weight-bold'>
              OR
            </div>
            <Form.Group className='mb-3' controlId='optionTwo'>
              <Form.Control
                type='text'
                placeholder='Enter Option Two Text Here'
                name='optionTwo'
                value={optionTwo}
                onChange={this.handleChange}
              />
            </Form.Group>
            <button
              type='submit'
              className='btn btn-danger card-button'
              disabled={this.state.isDisabled}>
              Submit
            </button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default NewQuestion