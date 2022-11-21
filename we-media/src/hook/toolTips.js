export default function(res, callback) {
  if(res?.code === 200) {
    ElMessage({
      type: "success",
      message: res.message
    })
    if(callback)
      callback();
  }else {
    ElMessage({
      type: "error",
      message: res.message
    })
  }
}