import {
  GET_USERS,
  UPDATE_USER_ANSWERS,
  UPDATE_USER_QUESTIONS
} from '../actions/users'

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users
      }
    case UPDATE_USER_ANSWERS:
      const { uid, qid, answer } = action
      return {
        ...state,
        [uid]: {
          ...state[uid],
          answers: {
            ...state[uid].answers,
            [qid]: answer
          }
        }
      }
    case UPDATE_USER_QUESTIONS:
      return {
        ...state,
        [action.uid]: {
          ...state[action.uid],
          questions: state[action.uid].questions.concat([action.qid])
        }
      }
    default: return state
  }
}