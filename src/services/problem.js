import request from '@/utils/request'

export function fetchProblemList(params) {
  return request({
    url: '/problem/list',
    method: 'get',
    params
  })
}

export function fetchProblemDetail(problemId) {
  return request({
    url: `/problem/detail/${problemId}`,
    method: 'get'
  })
}

export function fetchProblemTagList() {
  return request({
    url: '/problem/tag/list',
    method: 'get'
  })
}

export function fetchProblemTagDetail(tagId) {
  return request({
    url: `/problem/tag/detail/${tagId}`,
    method: 'get'
  })
}