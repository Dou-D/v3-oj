import request from '@/utils/request'

export function getLoginAPI(data) {
  request.post('/user/login', data)
}

export function getRegisterAPI(data) {
  request.post('/user/register', data)
}