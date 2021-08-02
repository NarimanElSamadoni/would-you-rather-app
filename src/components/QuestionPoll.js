import { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Form } from 'react-bootstrap'

class QuestionPoll extends Component {

  state = {
    selectedOption: 'optionOne'
  }

  handleChange = (e) => {
    const { value } = e.target

    this.setState(() => ({
      selectedOption: value
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.selectedOption)
  }

  render() {
    const { question, author } = this.props
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
                  <Form.Check
                    type='radio'
                    label={question.optionOne.text}
                    name='radioGroup'
                    value='optionOne'
                    className='mb-3'
                    checked={this.state.selectedOption === 'optionOne'}
                    onChange={this.handleChange} />

                  <Form.Check
                    type='radio'
                    label={question.optionTwo.text}
                    name='radioGroup'
                    value='optionTwo'
                    className='mb-3'
                    checked={this.state.selectedOption === 'optionTwo'}
                    onChange={this.handleChange} />
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