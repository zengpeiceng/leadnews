import request from "/src/utils/request";

export function getSensitives(data) {
  if(data.name == "" || data.name == undefined || data.name == null) {
    delete data.name
  }
  return request({
    method: "POST",
    url: "/sensitive/list",
    data
  })
}

export function updateSensitive(data) {
  return request({
    method: "POST",
    url: "/sensitive/update",
    data
  })
}

export function addSensitive(data) {
  return request({
    method: "POST",
    url: "/sensitive/add",
    data
  })
}

export function deleteSensitive(id) {
  return request({
    method: "DELETE",
    url: `/sensitive/delete/${id}`
  })
}