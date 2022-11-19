<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40]"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["pageChange"]);
const props = defineProps({
  total: Number,
});
let currentPage = ref(1);
let pageSize = ref(10);

const handleSizeChange = (val) => {
  pageSize.value = val;
  emit("pageChange", { page: currentPage.value, size: pageSize.value });
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
  emit("pageChange", { page: currentPage.value, size: pageSize.value });
};
</script>

<style lang="less" scoped>
.el-pagination {
  height: 100%;
  justify-content: center;
}
</style>