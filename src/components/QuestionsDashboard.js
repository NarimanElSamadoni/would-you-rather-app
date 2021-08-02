import { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Tabs, Tab } from 'react-bootstrap'
import QuestionCard from './QuestionCard'

class QuestionsDashboard extends Component {
  render() {
    console.log(this.props)
    const { unansweredQuestions, answeredQuestions } = this.props

    return (
      <div>
        <Container>
          <div className='row'>
            <div className='col-8 offset-2'>
              <Card>
                <Card.Body className='p-0'>
                  <Tabs defaultActiveKey="UnansweredQuestions">
                    <Tab eventKey="UnansweredQuestions" title="Unanswered Questions">
                      {unansweredQuestions.map((id) => (
                        <QuestionCard
                          key={id}
                          id={id} />
                      ))}
                    </Tab>
                    <Tab eventKey="answeredQuestions" title="AnsweredQuestions">
                      {answeredQuestions.map((id) => (
                        <QuestionCard
                          key={id}
                          id={id} />
                      ))}
                    </Tab>
                  </Tabs>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const userAnswers = Object.keys(users[authedUser].answers)

  const unansweredQuestions = Object.keys(questions)
    .filter((ques) => !userAnswers.includes(ques))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  const answeredQuestions = Object.keys(questions)
    .filter((ques) => userAnswers.includes(ques))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  return {
    unansweredQuestions: unansweredQuestions,
    answeredQuestions: answeredQuestions,
  }
}

export default connect(mapStateToProps)(QuestionsDashboard)