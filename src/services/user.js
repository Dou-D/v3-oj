import request from '@/utils/request'

export function getLoginAPI(data) {
  return request.post('/user/login', data)
}

export function getRegisterAPI(data) {
  return request.post('/user/register', data)
}

export function getVerificationCodeAPI() {
  return request.get('/utils/email_verify')
}