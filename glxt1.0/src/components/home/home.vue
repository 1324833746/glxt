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
              >JOIN</a>
            </div>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="2" style="margin:auto;">
            <div class="div-header-loginout">
              <a href="./#/admin/#">后台管理</a>
              <el-button @click.prevent="handlelogout()" class="button-loginout" type="danger">退出登录</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!--主要内容-->
      <el-container style="height: 100%" class="main">
        <el-aside width="200px" class="main-aside">
          <el-menu :router="true">
            <!--我的信息-->
            <el-menu-item index="information">
              <i class="el-icon-s-custom"></i>
              <span slot="title">我的信息</span>
            </el-menu-item>
            <!--报名活动-->
            <el-menu-item index="bmhd">
              <i class="el-icon-reading"></i>
              <span slot="title">报名活动</span>
            </el-menu-item>
            <!--结算奖励-->
            <el-menu-item index="jsjl">
              <i class="el-icon-medal"></i>
              <span slot="title">结算奖励</span>
            </el-menu-item>
            <!--我的活动-->
            <el-menu-item index="wdhd">
              <i class="el-icon-star-off"></i>
              <span slot="title">我的活动</span>
            </el-menu-item>
            <!--结算记录-->
            <el-menu-item index="record">
              <i class="el-icon-time"></i>
              <span slot="title">结算记录</span>
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
    return {
      showadmin: true
    };
  },
  beforeCreate() {
    const AUTH_TOKEN = localStorage.getItem("token");
    //console.log(AUTH_TOKEN);
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    if (!AUTH_TOKEN) {
      this.$router.push({ name: "login" });
    }
    axios
      .get("/api/users/get?token=1")
      .then(res => {
        this.$message.success("欢迎回来");
      })
      .catch(error => {
        //ole.log(error);
        this.$message.error("登录信息过期");
        localStorage.removeItem("token");
        this.$router.push({ name: "login" });
      });
  },
  methods: {
    handlelogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      this.$message.success("注销成功");
      this.$router.push({ name: "login" });
    },
    handleadmin() {
      this.$router.push({ name: "admin" });
    }
  }
};
</script>

<style>
.home-main {
}
</style>