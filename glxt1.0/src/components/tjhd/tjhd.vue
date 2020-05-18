<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="tjhd_info" label-width="200px">
        <el-form-item label="活动名称:">
          <el-input v-model="tjhd_info.activity_name" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="活动内容:">
          <el-input
            type="textarea"
            maxlength="2000"
            v-model="tjhd_info.activity_content"
            style="width:100%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="join值:">
          <el-input v-model="tjhd_info.activity_join" style="width:100%;"></el-input>
        </el-form-item>

        <el-form-item label="截止时间:">
          <div class="block">
            <el-date-picker
              v-model="t_deadline"
              type="datetime"
              placeholder="选择日期时间"
              style="width:100%;"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="活动最大报名人数:">
          <el-input v-model="tjhd_info.activity_maxnum" style="width:100%;"></el-input>
        </el-form-item>
        <el-button @click.prevent="tjhdclick()" type="danger">添加活动</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      t_deadline: null,
      tjhd_info: {
        activity_name: "",
        activity_content: "",
        activity_deadline: "",
        activity_join: 0,
        activity_num: 0,
        activity_maxnum: 0,
        activity_time: ""
      }
    };
  },
  methods: {
    tjhdclick() {
      if (this.tjhd_info.activity_name == "") {
        this.$message.error("请输入活动名称");
      } else if (this.tjhd_info.activity_content == "") {
        this.$message.error("请输入活动内容");
      } else if (this.t_deadline == null) {
        this.$message.error("请选择截止日期");
      } else {
        //日期格式化
        Date.prototype.Format = function(fmt) {
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            S: this.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              (this.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                  ? o[k]
                  : ("00" + o[k]).substr(("" + o[k]).length)
              );
          return fmt;
        };
        //获取格式化后的时间
        this.tjhd_info.activity_time = new Date().Format(
          "yyyy-MM-ddTHH:mm:ssZ"
        );
        this.tjhd_info.activity_deadline = this.t_deadline.Format(
          "yyyy-MM-ddTHH:mm:ssZ"
        );
        this.tjhd_info.activity_num = this.tjhd_info.activity_maxnum;
        //alert(this.tjhd_info.activity_deadline);
        axios.post("/api/activities/", this.tjhd_info).then(res => {
          this.$message.success("添加成功");
          this.tjhd_info = {
            activity_name: "",
            activity_content: "",
            activity_deadline: "",
            activity_join: 0,
            activity_num: 0,
            activity_maxnum: 0,
            activity_time: ""
          };
        });
      }
    }
  },
  created() {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  }
};
</script>

<style>
</style>