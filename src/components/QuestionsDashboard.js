import { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Tabs, Tab } from 'react-bootstrap'

class QuestionsDashboard extends Component {
  render() {
    console.log(this.props)
    const { unansweredQuestions, answeredQuestions } = this.props

    return (
      <div>
        {/* style={{ backgroundColor: 'lightblue' }} */}
        <Container>
          <div className='row'>
            <div className='col-8 offset-2'>
              <Card>
                <Card.Body className='p-0'>
                  <Tabs defaultActiveKey="UnansweredQuestions">
                    <Tab eventKey="UnansweredQuestions" title="Unanswered Questions">
                      <ul>
                        {unansweredQuestions.map((id) => (
                          <li key={id}>
                            Question Id: {id}
                          </li>
                        ))}
                      </ul>
                    </Tab>
                    <Tab eventKey="answeredQuestions" title="AnsweredQuestions">
                      <ul>
                        {answeredQuestions.map((id) => (
                          <li key={id}>
                            Question Id: {id}
                          </li>
                        ))}
                      </ul>
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