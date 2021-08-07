import React from 'react'
import { Card, ProgressBar } from 'react-bootstrap'

const OptionResultCard = (props) => {
  const { question, option, totalVotes, selected } = props
  const votes = totalVotes === 0 ? 0 : ((question[option].votes.length / totalVotes) * 100).toFixed(2)

  return (
    <div className='my-3'>
      {selected && (
        <div className='vote-badge'>
          Your Vote
        </div>
      )}
      <Card style={{ backgroundColor: selected && '#f5d2d2', borderColor: selected && '#dc3545' }}>
        <Card.Body>
          <Card.Subtitle>
            Would you rather {question[option].text} ?
          </Card.Subtitle>
          <ProgressBar
            variant="danger"
            now={votes}
            label={`${votes}%`} />
          <Card.Text className='votes-text'>
            {question[option].votes.length} out of {totalVotes} votes
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default OptionResultCard