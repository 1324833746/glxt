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
          <el-col :span="6"></el-col>
          <el-col :span="2" style="margin:auto;"></el-col>
        </el-row>
      </el-header>
      <!--主要内容-->

      <el-main style="height: 100%">
        <el-row :gutter="20" type="flex" justify="center" class="login-main">
          <!--
          <el-col :span="14">
            
             公告 
            <el-card class="login-notice-card">
              <div slot="header" class="notice-top">
                <h1 style="text">公告</h1>
              </div>
              <div v-for="item in noticeData" :key="item" class="item">
                <h2 class="text">{{item.text+"-----"+item.date}}</h2>
                <el-divider></el-divider>
                
              </div>
              /* <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"*/
              ></el-pagination> 
            </el-card>
          </el-col>-->
          <!-- 登录表单 -->
          <el-col :span="6">
            <el-form class="login-form" :label-position="top" label-width="80px" :model="formdata">
              <h2>用户登录</h2>
              <el-form-item label="用户名">
                <el-input v-model="formdata.username" clearable placeholder="请输入学号/工号"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formdata.password" clearable placeholder="请输入密码" show-password></el-input>
              </el-form-item>
              <el-button @click.prevent="handlelogin()" class="login-btn" type="primary">登录</el-button>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import qs from "Qs";
export default {
  data() {
    return {
      top: "",
      formdata: {
        username: "",
        password: ""
      },
      token: "",
      noticeData: [
        {
          date: "2020-03-14",
          name: "管理员",
          text: "小组成员：肖云浩，黄雅轩，罗天舒，伏文学，尹琛"
        },
        {
          date: "2020-03-15",
          name: "管理员",
          text: "建设中"
        }
      ]
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    handlelogin() {
      axios
        .post("/login/", this.formdata)
        .then(res => {
          console.log(res);
          console.log(res.status);
          //console.log(this.formdata)
          //console.log(this.formdata.password)
          this.token = "jwt " + res.data.token;
          console.log(this.token);
          //成功
          if (res.status === 200) {
            //保存token
            localStorage.setItem("token", this.token);
            //记录登陆时间
            const AUTH_TOKEN = localStorage.getItem("token");
            axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            axios.get("/api/users/get?token=1").then(res => {
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
              var myDate = new Date().Format("yyyy-MM-ddTHH:mm:ssZ");
              console.log(myDate);
              axios
                .put("/api/users/" + res.data[0].pk + "/", {
                  "last_login": myDate.toLocaleString(),
                  "username":res.data[0].username,
                })
            });
            

            //跳转到home
            this.$router.push({ name: "home" });
            //提示成功
            this.$message.success("登陆成功");
          } else {
            this.$message.error("登陆失败");
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error("登陆失败");
        });
      //跳转
      //this.$router.push({ name: "home" });
    }
  }
};
</script>

<style>
.login-page {
  height: 100%;
}
.div-header-text {
  height: 80px;
  line-height: 80px;
}
.header-text {
  height: 50px;
  font-size: 60px;
}
.login-head {
  background-color: #ffffff;
  text-align: center;
}
.header-logo {
  display: inline-block;
  width: 80px;
}
.header-text {
  display: inline-block;
  font-size: 20px;
  color: #909399;
}
.login-main {
  margin: 50px;
}
.notice-top {
  height: 30px;
  border: #333;
}
.login-form {
  width: 400px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 30px;
}
.login-btn {
  width: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.text {
  font-size: 20px;
  margin: auto;
}

.item {
  height: 50px;
  text-align: center;
}
.login-notice-card {
  width: 1000px;
  height: 100%;
}
</style>