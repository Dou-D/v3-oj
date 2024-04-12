import request from "@/utils/request";

export const getLoginAPI = ({ username, password }) =>
  request.post(
    "/user/login",
    { "username": username, "password": password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

export function getRegisterAPI(data) {
  return request.post("/user/register", data);
}

export function getVerificationCodeAPI() {
  return request.get("/utils/email_verify");
}
