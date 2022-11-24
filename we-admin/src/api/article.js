import request from "../utils/request";

export function getArticles() {
  return request({
    method: "POST",
    url: "/article/list"
  })
}