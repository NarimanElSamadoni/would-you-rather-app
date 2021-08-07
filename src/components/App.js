import '../App.css'
import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { Container } from 'react-bootstrap'
import { handleInitialData } from '../actions/shared'
import QuestionsDashboard from './QuestionsDashboard'
import QuestionPoll from './QuestionPoll'
import QuestionResults from './QuestionResults'
import Navigation from './Navigation'
import LeaderBoard from './LeaderBoard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div>
          <LoadingBar />
          <Navigation />
          <Container style={{margin: '5rem auto 2rem auto'}}>
            <div className='row'>
              <div className='col-8 offset-2'>
                {this.props.loading === true
                  ? null
                  : <div>
                    <Route path='/' exact component={QuestionsDashboard} />
                    <Route path='/question/:id/poll' component={QuestionPoll} />
                    <Route path='/question/:id/results' component={QuestionResults} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                  </div>
                }
              </div>
            </div>
          </Container>
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
