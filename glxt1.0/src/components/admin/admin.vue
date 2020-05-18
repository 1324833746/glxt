<template>
  <div class="login-page">
    <el-container style="height: 100%;">
      <!--头部-->
      <el-header class="login-head" style="height: 80px;">
        <el-row :gutter="2" type="flex" justify="center">
          <el-col :span="9"></el-col>
          <el-col :span="1">
            <img class="header-logo" src="../../../static/hzau_logo.png" alt="hzau" />
          </el-col>
          <el-col :span="2">
            <div class="div-header-text">
              <a
                class="header-text"
                style="font-size:35px;white-space:nowrap;text-decoration:none;"
                href="#"
              >JOIN后台</a>
            </div>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="2" style="margin:auto;">
            <div class="div-header-loginout">
              <el-button @click.prevent="handlelogout()" class="button-loginout" type="danger">退出登录</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!--主要内容-->
      <el-container style="height: 100%" class="main">
        <el-aside width="200px" class="main-aside">
          <el-menu :router="true">
            <!--会员管理-->
            <el-menu-item index="hygl">
              <i class="el-icon-s-custom"></i>
              <span slot="title">会员管理</span>
            </el-menu-item>
            <!--添加活动-->
            <el-menu-item index="tjhd">
              <i class="el-icon-s-custom"></i>
              <span slot="title">添加活动</span>
            </el-menu-item>
            <!--活动管理-->
            <el-menu-item index="hdgl">
              <i class="el-icon-s-custom"></i>
              <span slot="title">活动管理</span>
            </el-menu-item>
            <!--结算管理 -->
            <el-menu-item index="jsgl">
              <i class="el-icon-s-custom"></i>
              <span slot="title">结算管理</span>
            </el-menu-item>
            <!--奖品管理-->
            <el-menu-item index="jpgl">
              <i class="el-icon-s-custom"></i>
              <span slot="title">奖品管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  beforeCreate() {
    const AUTH_TOKEN = localStorage.getItem("token");
    console.log(AUTH_TOKEN);
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    if (!AUTH_TOKEN) {
      this.$router.push({ name: "login" });
    }
    axios
      .get("/api/users/get?token=1")
      .then(res => {
        if (!res.data[0].is_superuser) {
          this.$message.error("您没有管理员权限");
          localStorage.removeItem("token");
          this.$router.push({ name: "login" });
        } else {
          this.$router.push({ path: "/admin/#" });
          this.$message.success("欢迎回来");
        }
      })
      .catch(error => {
        console.log(error);
        this.$message.error("登录信息过期");
        localStorage.removeItem("token");
        this.$router.push({ name: "login" });
      });
  },
  methods: {
    handlelogout() {
      localStorage.removeItem("token");
      this.$message.success("注销成功");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
.home-main {
}
</style>