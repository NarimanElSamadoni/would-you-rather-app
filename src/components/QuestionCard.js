import { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class QuestionCard extends Component {
  render() {
    const { question, author, path } = this.props
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
                  className='round-img' />
              </div>
              <div className='col-8'>
                <Card.Title>
                  Would you rather ?
                </Card.Title>
                <Card.Text>
                  {question.optionOne.text} or {question.optionTwo.text}.
                </Card.Text>
                <Link
                  to={{
                    pathname: `/questions/${question.id}`,
                    state: { to: path }
                  }}
                  className='btn btn-outline-danger card-button'>
                  View Poll
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, { id, path }) {
  const question = questions[id]
  const author = users[question.author]
  return {
    question,
    author,
    path
  }
}

export default connect(mapStateToProps)(QuestionCard)