export const GET_USERS = 'GET_USERS'
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS'

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  }
}

export function updateUserAnswers(uid, qid, answer) {
  return {
    type: UPDATE_USER_ANSWERS,
    uid,
    qid,
    answer
  }
}