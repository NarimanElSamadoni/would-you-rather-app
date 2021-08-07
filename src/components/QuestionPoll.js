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
    const { question, author } = this.props
    const { selectedOption, toResults } = this.state

    if (toResults === true) {
      return <Redirect to={`/question/${question.id}/results`} />
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
                    {value: 'optionOne', text: question.optionOne.text},
                    {value: 'optionTwo', text: question.optionTwo.text}
                  ].map((op) => (
                    <Form.Check
                      key={op.value}
                      type='radio'
                      label={op.text}
                      name='radioGroup'
                      value={op.value}
                      className='mb-3'
                      checked={selectedOption === op.value }
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

function mapStateToProps({ questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const author = users[question.author]
  return {
    question,
    author
  }
}

export default connect(mapStateToProps)(QuestionPoll)