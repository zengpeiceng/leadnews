import request from "@/utils/request.js";

export function materialList(data) {
  return request({
    method: "POST",
    url: "/",
    data
  })
}