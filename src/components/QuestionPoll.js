import { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Form } from 'react-bootstrap'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class QuestionPoll extends Component {
  state = {
    selectedOption: 'optionOne',
    toResults: false
  }

  handleChange = (e) => {
    const { value } = e.target

    this.setState(() => ({
      selectedOption: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { selectedOption } = this.state
    const { dispatch } = this.props
    const { id } = this.props.question

    dispatch(handleSaveQuestionAnswer(id, selectedOption))

    this.setState(() => ({
      selectedOption: 'optionOne',
      toResults: true
    }))
  }

  render() {
    const { authedUser, question, author, from } = this.props
    const { selectedOption, toResults } = this.state

    if (authedUser === null) {
      return <Redirect to={{
        pathname: '/login',
        state: { from: from }
      }} />
    } else if (question == null) {
      return <Redirect to='/404' />
    }

    if (toResults === true) {
      return <Redirect to={{
        pathname: `/questions/${question.id}`,
        state: { to: 'results' }
      }} />
    }

    return (
      <div>
        <Card className='m-3'>
          <Card.Header>
            {author.name} asks:
          </Card.Header>
          <Card.Body>
            <div className='row'>
              <div className='col-4 card-inline-border'>
                <img
                  src={author.avatarURL}
                  alt={`Avatar of ${author.name}`}
                  className='round-img round-img-90' />
              </div>
              <div className='col-8 m-auto'>
                <Card.Title>
                  Would you rather ?
                </Card.Title>
                <Form onSubmit={this.handleSubmit}>
                  {[
                    { value: 'optionOne', text: question.optionOne.text },
                    { value: 'optionTwo', text: question.optionTwo.text }
                  ].map((op) => (
                    <Form.Check
                      key={op.value}
                      type='radio'
                      label={op.text}
                      name='radioGroup'
                      value={op.value}
                      className='mb-3'
                      checked={selectedOption === op.value}
                      onChange={this.handleChange} />
                  ))}
                  <button
                    type='submit'
                    className='btn btn-outline-danger card-button'>
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const id = props.id
  const question = questions[id]
  const author = (question != null) ? users[question.author] : null
  const from = props.from
  return {
    authedUser,
    question,
    author,
    from
  }
}

export default connect(mapStateToProps)(QuestionPoll)