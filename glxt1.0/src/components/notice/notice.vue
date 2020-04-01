<template>
  <div>
    <el-card class="notice-card">
      <div slot="header" class="notice-top">
        <h1 style="text">公告</h1>
      </div>
      <div v-for="item in noticeData" v-bind:key="item" class="item">
        <h2 class="text">{{item.text+"-----"+item.date}}</h2>
        <el-divider></el-divider>
      </div>
      <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
      ></el-pagination>-->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeData: [
        {
          date: "2020-03-31",
          name: "管理员",
          text: "小组成员：肖云浩，黄雅轩，罗天舒，伏文学，尹琛"
        },
        {
          date: "2020-03-31",
          name: "管理员",
          text: "建设中"
        }
      ]
    };
  }
};
</script>

<style>
</style>