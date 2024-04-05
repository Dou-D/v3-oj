import request from '@/utils/request'

export function fetchProblemList(params) {
  request.get('/problem/list', { params })
}

export function fetchProblemDetail(problemId) {
  request.get('/problem/detail/' + problemId)
}

export function fetchProblemTagList() {
  request.get('/problem/tag/list')
}

export function fetchProblemTagDetail(tagId) {
  request.get('/problem/tag/detail/' + tagId)
}