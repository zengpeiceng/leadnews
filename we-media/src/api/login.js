import request from "/src/utils/request.js"

export function Login(data) {
  return request({
    method: "POST",
    url: "/login",
    data
  })
}