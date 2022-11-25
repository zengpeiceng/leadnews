import request from "../utils/request";

export function getArticles(payload) {
  let data = {};
  Object.keys(payload).filter((key) => {
    if (
      payload[key] != undefined &&
      payload[key] != "" &&
      payload[key] != null
    ) {
      data[key] = payload[key];
    }
  });
  if(data?.date?.length > 0) {
    data.beginPubDate = data.date[0]
    data.endPubDate = data.date[1]
    delete data.date;
  }
  return request({
    method: "POST",
    url: "/article/list",
    data,
  });
}

export function getArticlesById(id) {
  return request({
    method: "GET",
    url: `/article/one/${id}`,
  });
}

export function examineArticle(data) {
  return request({
    method: "POST",
    url: `/article/examine`,
    data,
  });
}

export function changeEnable(data) {
  return request({
    method: "POST",
    url: `/article/down_or_up`,
    data
  })
}
