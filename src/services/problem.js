import request from '@/utils/request'

export function fetchProblemList(params) {
  return request.get('/problem/list', { params })
}

export function fetchProblemDetail(problemId) {
  return request.get('/problem/detail/' + problemId)
}

export function fetchProblemTagList() {
  return request.get('/problem/tag/list')
}

export function fetchProblemTagDetail(tagId) {
  return request.get('/problem/tag/detail/' + tagId)
}