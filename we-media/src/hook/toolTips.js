export default function(res, callback) {
  if(res?.code === 200) {
    ElMessage({
      type: "success",
      message: res.message
    })
    callback();
  }else {
    ElMessage({
      type: "error",
      message: res.message
    })
  }
}