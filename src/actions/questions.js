import { hideLoading, showLoading } from "react-redux-loading"
import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { updateUserAnswers, updateUserQuestions } from '../actions/users'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  }
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    }).then((question) => {
      dispatch(addQuestion(question))
      dispatch(updateUserQuestions(authedUser, question.id))
    }).then(() => dispatch(hideLoading()))
  }
}

function addQuestionAnswer(authedUser, id, answer) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    questionId: id,
    answer
  }
}

export function handleSaveQuestionAnswer(id, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestionAnswer({
      authedUser,
      qid: id,
      answer
    }).then(() => {
      dispatch(addQuestionAnswer(authedUser, id, answer))
      dispatch(updateUserAnswers(authedUser, id, answer))
    })
      .then(() => dispatch(hideLoading()))
  }
}