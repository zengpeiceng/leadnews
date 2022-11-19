import request from "@/utils/request.js";
// 获取素材
export function materialList(data) {
  return request({
    method: "POST",
    url: "/material/list",
    data,
  });
}
// 收藏素材
export function collectMaterial(id) {
  return request({
    method: "GET",
    url: `/material/collect/${id}`,
  });
}
// 取消收藏素材
export function cancelCollect(id) {
  return request({
    method: "GET",
    url: `/material/cancel_collect/${id}`,
  });
}
// 删除素材
export function deleteMaterial(id) {
  return request({
    method: "DELETE",
    url: `/material/delete_material/${id}`,
  });
}
// 上传
export function uploadMetarial(data) {
  return request({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    url: "/material/upload_picture",
    data
  });
}
