<template>
  <div>
    <el-card class="box-card">
      <div>id: {{information.id}}</div>
      <div>用户名: {{information.username}}</div>
      <div>是不是管理员: {{information.is_superuser}}</div>
      <div>join分: {{information.join}}</div>
      <div>上次登录: {{information.last_login}}</div>
      <div>手机号: {{information.phone}}</div>
      <div>备注: {{information.remark}}</div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      information: {
        id: "",
        username: "",
        is_superuser: "",
        join: "",
        last_login: "",
        phone: "",
        remark: ""
      }
    };
  },
  created() {
    console.log(this.information);
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.get("/api/users/get?token=1").then(res => {
      console.log(res.data[0]);
      this.information.id = res.data[0].pk;
      this.information.username = res.data[0].username;
      this.information.is_superuser = res.data[0].is_superuser;
      this.information.join = res.data[0].join;
      this.information.last_login = res.data[0].last_login;
      this.information.phone = res.data[0].mobile;
      this.information.remark = res.data[0].remark;
    });
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.el-input {
  width: 100px;
}
</style>