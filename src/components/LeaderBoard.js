import { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { ImTrophy } from 'react-icons/im/index'

class LeaderBoard extends Component {
  render() {
    const { users } = this.props
    return (
      <div>
        {Object.keys(users).map((u, index) => (
          <div key={u} className='leaderboard-card mt-3 p-3'>
            <div className='row'>
              <div className='col-4 card-inline-border'>
                <ImTrophy
                  color={(index === 0) ? '#e8ad19' : (index === 1) ? '#b3b0b0' : (index === 2) ? '#ce865b' : '#dc3545'} />
                <img
                  src={users[u].avatarURL}
                  alt={`Avatar of ${users[u].name}`}
                  className='round-img' />
              </div>
              <div className='col-5'>
                <h4>{users[u].name}</h4>
                <div className='score-info score-border-bottom '>
                  <span className='float-left'>Answered Questions </span>
                  <span className='float-right'>{Object.keys(users[u].answers).length}</span>
                </div>
                <div className='score-info'>
                  <span className='float-left'>Created Questions </span>
                  <span className='float-right'>{users[u].questions.length}</span>
                </div>
              </div>
              <div className='col-3'>
                <Card style={{ height: '100%' }}>
                  <Card.Header style={{ textAlign: 'center' }}>
                    Score
                  </Card.Header>
                  <Card.Body>
                    <div className='score'>
                      {users[u].score}
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const usersWithScore = Object.keys(users).map((u) => {
    return { ...users[u], score: users[u].questions.length + Object.keys(users[u].answers).length }
  }).sort((a, b) => b.score - a.score)

  return {
    users: usersWithScore
  }
}

export default connect(mapStateToProps)(LeaderBoard)