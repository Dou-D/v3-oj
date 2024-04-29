import request from "@/utils/request";

export const getLoginAPI = ({ username, password }) =>
  request.post(
    "/user/login",
    { "username": username, "password": password },
  );

export function getRegisterAPI(data) {
  return request.post("/user/register", data);
}

export function getVerificationCodeAPI(email) {
  console.log("email: " + email);
  return request.get("/utils/email_verify", {params: {email}});
}

export function getUserInfoAPI() {
  return request.get('/user/userinfo');
}