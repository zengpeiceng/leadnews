import request from "/src/utils/request";

export function getContentlist(data) {
  return request({
    method: "POST",
    url: "/article/list",
    data
  })
}