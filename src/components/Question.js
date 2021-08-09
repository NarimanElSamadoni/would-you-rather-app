import React from 'react'
import QuestionPoll from './QuestionPoll'
import QuestionResults from './QuestionResults'

const Question = (props) => {
  const { to } = props.location.state || { to: 'poll' }
  const { id } = props.match.params
  const currLocation = props.location.pathname

  if (to === 'poll') {
    return <QuestionPoll id={id} from={currLocation} />
  } else if (to === 'results') {
    return <QuestionResults id={id} />
  }
}

export default Question