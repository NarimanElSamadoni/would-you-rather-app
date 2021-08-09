import '../App.css'
import { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import { Container } from 'react-bootstrap'
import { handleInitialData } from '../actions/shared'
import QuestionsDashboard from './QuestionsDashboard'
import Navigation from './Navigation'
import LeaderBoard from './LeaderBoard'
import NewQuestion from './NewQuestion'
import Login from './Login'
import FourOhFour from './FourOhFour'
import Question from './Question'

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
          <Container style={{ margin: '6rem auto 2rem auto' }}>
            <div className='row'>
              <div className='col-8 offset-2'>
                <div>
                  <Switch>
                    <Route path='/' exact component={QuestionsDashboard} />
                    <Route path='/login' component={Login} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/questions/:id' component={Question} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route path='/404' component={FourOhFour} />
                    <Route path='*' component={FourOhFour} />
                  </Switch>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Router>
    )
  }
}

export default connect()(App);
