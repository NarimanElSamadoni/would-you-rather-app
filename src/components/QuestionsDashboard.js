import { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Tabs, Tab } from 'react-bootstrap'
import QuestionCard from './QuestionCard'
import { Redirect } from 'react-router-dom'

class QuestionsDashboard extends Component {
  render() {
    const { authedUser, unansweredQuestions, answeredQuestions } = this.props

    if (authedUser === null) {
      return <Redirect to='/login' />
    }

    return (
      <div>
        <Card className='dashboard-card'>
          <Card.Body className='p-0'>
            <Tabs defaultActiveKey='UnansweredQuestions'>
              <Tab eventKey='UnansweredQuestions' title='Unanswered Questions'>
                {unansweredQuestions.map((id) => (
                  <QuestionCard
                    key={id}
                    id={id}
                    path='poll' />
                ))}
              </Tab>
              <Tab eventKey='answeredQuestions' title='Answered Questions'>
                {answeredQuestions.map((id) => (
                  <QuestionCard
                    key={id}
                    id={id}
                    path='results' />
                ))}
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  let unansweredQuestions = []
  let answeredQuestions = []
  if (authedUser !== null) {
    const userAnswers = Object.keys(users[authedUser].answers)

    unansweredQuestions = Object.keys(questions)
      .filter((ques) => !userAnswers.includes(ques))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    answeredQuestions = Object.keys(questions)
      .filter((ques) => userAnswers.includes(ques))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }

  return {
    authedUser,
    unansweredQuestions: unansweredQuestions,
    answeredQuestions: answeredQuestions,
  }
}

export default connect(mapStateToProps)(QuestionsDashboard)