import { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import OptionResultCard from './OptionResultCard'

class QuestionResults extends Component {
  calculateTotalVotes = () => {
    const { question } = this.props
    const totalVotes = question['optionOne'].votes.length + question['optionTwo'].votes.length
    return totalVotes
  }

  render() {
    const { question, author, selectedOption } = this.props
    return (
      <div>
        <Card className='m-3'>
          <Card.Header>
            Asked by {author.name}
          </Card.Header>
          <Card.Body>
            <div className='row'>
              <div className='col-4 card-inline-border m-auto'>
                <img
                  src={author.avatarURL}
                  alt={`Avatar of ${author.name}`}
                  className='round-img round-img-90' />
              </div>
              <div className='col-8'>
                <Card.Title>
                  Results:
                </Card.Title>
                <div>
                  {['optionOne', 'optionTwo'].map((op) => (
                    <OptionResultCard
                      key={op}
                      option={op}
                      question={question}
                      totalVotes={this.calculateTotalVotes()}
                      selected={op === selectedOption} />
                  ))}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  const author = users[question.author]
  const selectedOption = users[authedUser].answers[id]
  return {
    question,
    author,
    selectedOption
  }
}

export default connect(mapStateToProps)(QuestionResults)