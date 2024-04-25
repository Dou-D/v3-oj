import request from "@/utils/request";

export const getLoginAPI = ({ username, password }) =>
  request.post(
    "/user/login",
    { "username": username, "password": password },
  );

export function getRegisterAPI(data) {
  return request.post("/user/register", data);
}

export function getVerificationCodeAPI() {
  return request.get("/utils/email_verify");
}

export function getUserInfoAPI(token) {
  return request.post("/user/userinfo",token);
}