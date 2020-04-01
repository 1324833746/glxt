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
          <el-col :span="6">
            <div class="div-header-text">
              <a
                class="header-text"
                style="font-size:35px;white-space:nowrap;text-decoration:none;"
                href="#"
              >华中农业大学图书管理系统</a>
            </div>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="2" style="margin:auto;">
            <div class="div-header-loginout">
              <el-button class="button-loginout" type="danger">退出登录</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!--主要内容-->
      <el-container style="height: 100%" class="main">
        <el-aside width="200px" class="main-aside">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
          >
            <!--公告-->
            <el-menu-item index="notice">
              <i class="el-icon-message-solid"></i>
              <span slot="title">公告</span>
            </el-menu-item>
            <!--个人信息-->
            <el-menu-item index="information">
              <i class="el-icon-s-custom"></i>
              <span slot="title">个人信息</span>
            </el-menu-item>
            <!--图书-->
            <el-submenu index="图书">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>图书</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="books">图书查询</el-menu-item>
                <el-menu-item index="mybooks">我的借阅</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!--活动-->
            <el-submenu index="活动">
              <template slot="title">
                <i class="el-icon-trophy"></i>
                <span>活动</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="events">活动查询</el-menu-item>
                <el-menu-item index="myevents">我的活动</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!--反馈-->
            <el-menu-item index="suggestion">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">反馈</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
  /*beforeCreate(){
    const token = localStorage.getItem('token')
    if(!token){
      this.$router.push({name:'login'})
    }
  }*/
};
</script>

<style>
.home-main {
}
</style>