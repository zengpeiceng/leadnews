import request from '../utils/request';

// 查询
export function queryChannel(data) {
  return request({
    method: "POST",
    url: "/channel/list",
    data
  })
}
// 编辑
export function editeChannel(data) {
  return request({
    method: "PUT",
    url: "/channel_update",
    data
  })
}
// 删除
export function deleteChannelById(id) {
  return request({
    method: "DELETE",
    url: `channel/deleteById/${id}`
  })
}
// 新增
export function addChannel(data) {
  return request({
    method: "POST",
    url: "/channel/create",
    data
  })
}