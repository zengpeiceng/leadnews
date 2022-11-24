import { ElMessage } from "element-plus";

export default function (res) {
  if (res?.status === 200 || res.code === 200) {
    ElMessage({
      message: "操作成功",
      type: "success",
    });
  } else {
    ElMessage({
      message: "操作失败",
      type: "error",
    });
  }
}
