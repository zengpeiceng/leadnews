import request from "/src/utils/request";

export function getChannels() {
  return request({
    method: "GET",
    url: "/channel"
  })
}