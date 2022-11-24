import request from '/src/utils/request';

// 发布
export function publishArticle(operate, data) {
  let url = "";
  if(operate) {
    url = "/article/submit?draft=false";
    data.status = 1;
  }else {
    url = "/article/submit?draft=true";
    data.status = 0;
    data.enable = 1;
  }
  return request({
    method: "POST",
    url,
    data
  })
}
// 查询
export function getContentlist(data) {
  return request({
    method: "POST",
    url: "/article/list",
    data
  })
}
// 单个文章
export function getArticleById(id) {
  return request({
    method: "GET",
    url: `/article/one/${id}`
  })
}

export function deleteArticle(id) {
  return request({
    method: "DELETE",
    url: `/article_delete/${id}`
  })
}