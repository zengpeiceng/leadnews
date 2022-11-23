import request from '/src/utils/request';

export function publishArticle(operate, data) {
  let url = "";
  if(operate) {
    url = "/article/submit?draft=false";
    data.status = 1;
    data.type = 1
  }else {
    url = "/article/submit?draft=true";
    data.status = 0;
    data.enable = 1;
    data.type = 0;
  }
  return request({
    method: "POST",
    url,
    data
  })
}