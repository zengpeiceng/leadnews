import request from '/src/utils/request';

export function publishArticle(operate, data) {
  let url = "";
  // data.publishTime = Date.parse(data.publishTime);
  if(operate) {
    url = "/article/submit?draft=false";
    data.status = 1;
  }else {
    url = "/article/submit?draft=true";
    data.status = 0;
  }
  return request({
    method: "POST",
    url,
    data
  })
}