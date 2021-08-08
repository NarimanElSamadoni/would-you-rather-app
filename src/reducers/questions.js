import {
  GET_QUESTIONS,
  ADD_QUESTION,
  ADD_QUESTION_ANSWER
} from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      const { question } = action
      return {
        ...state,
        [question.id]: action.question,
      }
    case ADD_QUESTION_ANSWER:
      const { questionId, answer } = action
      let votes = []
      if (!state[questionId][answer].votes.includes(action.authedUser)) {
        votes = state[questionId][answer].votes.concat(action.authedUser)
      } else {
        votes = state[questionId][answer].votes
      }
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answer]: {
            ...state[questionId][answer],
            votes: votes
          }
        }
      }
    default: return state
  }
}