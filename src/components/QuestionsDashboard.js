import react, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Tabs, Tab } from 'react-bootstrap'

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
              <Tabs defaultActiveKey="UnansweredQuestions" className='mb-3'>
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
            </div>
          </div>
        </Container>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  const userAnswers = Object.keys(users[authedUser].answers)
  const unansweredQuestions = Object.keys(questions).filter((ques) => !userAnswers.includes(ques))
  const answeredQuestions = Object.keys(questions).filter((ques) => userAnswers.includes(ques))
  return {
    unansweredQuestions: unansweredQuestions.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions: answeredQuestions.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(QuestionsDashboard)