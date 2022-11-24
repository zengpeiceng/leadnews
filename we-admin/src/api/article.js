import request from "../utils/request";

export function getArticles(data) {
  if(data.status == "")
    delete data.status
  return request({
    method: "POST",
    url: "/article/list",
    data
  })
}

export function getArticlesById(id) {
  return request({
    method: "GET",
    url: `/article/one/${id}`
  })
}