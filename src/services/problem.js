import request from '@/utils/request'

/**
 * 
 * @param {number} page 
 * @param {number} number 
 * @returns Promise<any>
 */
export function fetchProblemList({ page, number }) {
  return request.get(`/question/list/${page}/${number}`,
    { params: { page: page, number: number} },
    {
      headers: { "Content-Type": "multipart/form-data" }
    })
}
/**
 * 
 * @param {string} problemId 
 * @returns Promise<any>
 */
export function fetchProblemDetail(problemId) {
  return request.get('/problem/detail/',
    { id: problemId }
  )
}
/**
 * 
 * @param {string} answer 
 * @param {number} id 
 * @returns 
 */
export function fetchUploadAnswer(answer, id) {
  return request.post('/question/commit_answer',
    { answer, id },
  )
}

export function fetchUploadQuestion({ title, content, degree, tag, input_test, expected_output }) {
  return request.post('/question/add_question',
    { title, content, degree, tag, input_test, expected_output },
  )
}