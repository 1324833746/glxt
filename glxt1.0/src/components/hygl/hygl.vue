<template>
  <div>
    <el-button @click.prevent="tj_hy_click() ">添加会员</el-button>
    <el-card class="hygl_card">
      <el-input v-model="search" placeholder="请输入搜索内容" style="width:100%"></el-input>
      <el-button round class="search_bt" @click.prevent="search_id() ">搜索ID</el-button>
      <el-button round class="search_bt" @click.prevent="search_name() ">搜索用户名</el-button>
    </el-card>

    <el-card class="hygl_card">
      <el-form ref="form" :model="u_info" label-width="200px">
        <el-form-item label="id:">
          <el-input v-model="u_info.pk" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input v-model="u_info.username" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员:" style="text-align: left;">
          <el-switch
            @change="change()"
            v-model="u_info.is_superuser"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="this.switch_state"
          ></el-switch>
        </el-form-item>

        <el-form-item label="脚印值:">
          <el-input v-model="u_info.join" style="width:100%;" :disabled="this.join_state"></el-input>
        </el-form-item>
        <el-form-item label="上次登录:">
          <el-input v-model="u_info.last_login" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="u_info.mobile" style="width:100%;" :disabled="this.mobile_state"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input
            type="textarea"
            maxlength="200"
            v-model="u_info.remark"
            style="width:100%;"
            :disabled="this.note_state"
          ></el-input>
        </el-form-item>
        <el-button @click.prevent="xgxx_click()" type="danger">{{xg_bt_text}}</el-button>
        <el-button @click.prevent="xgpd_click()" type="danger">修改密码</el-button>
        <el-button @click.prevent="delete_click()" type="danger">删除会员</el-button>
      </el-form>
    </el-card>

    <!--添加会员-->
    <el-dialog title="添加会员" :visible.sync="tj_hy_Visible">
      <!-- hhh-->
      <el-form ref="form" :model="tj_u_info" label-width="200px">
        <el-form-item label="用户名:">
          <el-input v-model="tj_u_info.username" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员:" style="text-align: left;">
          <el-switch
            @change="change()"
            v-model="tj_u_info.is_superuser"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>

        <el-form-item label="脚印值:">
          <el-input v-model="tj_u_info.join" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="tj_u_info.mobile" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" maxlength="200" v-model="tj_u_info.remark" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="pd1" style="width:100%;" clearable placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码:">
          <el-input v-model="pd2" style="width:100%;" clearable placeholder="请确认密码" show-password></el-input>
        </el-form-item>
      </el-form>
      <!-- hhh -->

      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click.prevent="tj_finish_click() ">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改密码-->
    <el-dialog title="修改密码" :visible.sync="xg_pd_Visible">
      <!-- hhh-->
      <el-form ref="form" :model="xg_pd" label-width="200px">
        <!-- <el-form-item label="原密码:">
          <el-input v-model="xg_pd.old_pd" style="width:100%;"></el-input>
        </el-form-item>-->
        <el-form-item label="新密码:">
          <el-input v-model="xg_pd.new_pd1" style="width:100%;" clearable placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:">
          <el-input v-model="xg_pd.new_pd2" style="width:100%;" clearable placeholder="请确认新密码" show-password></el-input>
        </el-form-item>
      </el-form>

      <!-- hhh -->

      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button type="primary" @click.prevent="xg_pd_finish_click() ">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import qs from "Qs";
export default {
  data() {
    return {
      search: null,
      u_info: {
        pk: "",
        username: "",
        is_superuser: false,
        join: "",
        last_login: "",
        mobile: "无",
        remark: "无"
      },
      xg_pd: {
        old_pd: "",
        new_pd1: "",
        new_pd2: ""
      },
      xg_bt_text: "修改信息",
      username_state: true,
      mobile_state: true,
      note_state: true,
      switch_state: true,
      join_state: true,
      t_user: "",
      tj_hy_Visible: false,
      xg_pd_Visible: false,
      tj_u_info: {
        username: "",
        is_superuser: false,
        join: "",
        mobile: "",
        remark: "无"
      },
      pd1: "",
      pd2: "",
      tj_user: ""
    };
  },
  methods: {
    search_id() {
      axios
        .get("/api/users/" + this.search + "/")
        .then(res => {
          if (true) {
            this.u_info = res.data;
            //console.log(res.data)
            this.t_user = this.u_info.pk;
            this.$message.success("搜索成功");
          } else {
            this.$message.error("搜索失败");
          }
        })
        .catch(() => {
          this.$message.error("搜索失败");
        });
    },
    search_name() {
      axios
        .get("/api/users/get/?username=" + this.search)
        .then(res => {
          if (res.data.length != 0) {
            this.t_user = this.u_info.pk;
            //console.log(res.data);
            this.u_info = res.data[0];
            this.$message.success("搜索成功");
          } else {
            //console.log(res.data);
            this.$message.error("搜索失败");
          }
        })
        .catch(res => {
          // console.log(res)
          this.$message.error("搜索失败");
        });
    },
    change() {
      //console.log(this.tj_u_info.is_superuser)
    },
    xgxx_click() {
      if (this.u_info.pk != "") {
        if (this.xg_bt_text == "修改信息") {
          this.username_state = false;
          this.mobile_state = false;
          this.note_state = false;
          this.switch_state = false;
          this.join_state = false;
          this.xg_bt_text = "确认修改";
        } else if (this.xg_bt_text == "确认修改") {
          this.username_state = true;
          this.mobile_state = true;
          this.note_state = true;
          this.switch_state = true;
          this.join_state = true;
          axios
            .put("/api/users/" + this.u_info.pk + "/", this.u_info)
            .then(res => {
              this.$message.success("修改成功");
              this.xg_bt_text = "修改信息";
            })
            .catch(res => {
              //console.log(this.u_info)
              this.$message.error("修改失败");
            });
        }
      }
    },
    xgpd_click() {
      if (this.u_info.pk != "") {
        this.xg_pd_Visible = true;
      }
    },
    xg_pd_finish_click() {
      //  if (this.xg_pd.old_pd == "") {
      //  this.$message.error("请输入原密码");
      // } else {
      if (this.xg_pd.new_pd1 == "") {
        this.$message.error("请输入新密码");
      } else {
        if (this.xg_pd.new_pd2 == "") {
          this.$message.error("请确认原密码");
        } else {
          if (this.xg_pd.new_pd2 != this.xg_pd.new_pd1) {
            this.$message.error("输入密码不一致");
          } else {
            //修改密码
            axios({
              url: "/xg_pd/",
              method: "post",
              data: qs.stringify({
                id: this.t_user,
                new_password: this.xg_pd.new_pd1
              }),
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=utf-8"
              }
            })
              .then(res => {
                this.xg_pd_Visible = false;
                this.xg_pd.new_pd1 = "";
                this.xg_pd.new_pd2 = "";

                this.$message.success("修改成功");
              })
              .catch(res => {
                console.log(res)
                this.$message.error("修改失败");
              });
          }
        }
      }
      // }
    },
    delete_click() {
      if (this.u_info.pk != "") {
        this.$confirm("您确定删除这个会员吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          axios
            .delete("/api/users/" + this.u_info.pk + "/")
            .then(res => {
              this.$message.success("删除成功");
            })
            .catch(res => {
              this.$message.error("删除失败");
            });
        });
      }
    },
    tj_hy_click() {
      this.tj_hy_Visible = true;
    },
    tj_finish_click() {
      if (this.tj_u_info.username == "") {
        this.$message.error("请输入用户名");
      } else {
        if (this.tj_u_info.join == "") {
          this.$message.error("请输入脚印值");
        } else {
          if (this.tj_u_info.mobile == "") {
            this.$message.error("请输入手机号");
          } else {
            if (this.tj_u_info.remark == "") {
              this.$message.error("请输入备注");
            } else {
              if (this.pd1 == "") {
                this.$message.error("请输入密码");
              } else {
                if (this.pd2 == "") {
                  this.$message.error("请确认密码");
                } else {
                  if (this.pd1 != this.pd2) {
                    this.$message.error("密码不一致");
                  } else {
                    //创建用户
                    axios({
                      url: "/api/users/post/",
                      method: "post",
                      data: qs.stringify({
                        username: this.tj_u_info.username,
                        password: this.pd1
                      }),
                      headers: {
                        "Content-Type":
                          "application/x-www-form-urlencoded;charset=utf-8"
                      }
                    })
                      .then(() => {
                        axios
                          .get(
                            "/api/users/get?username=" + this.tj_u_info.username
                          )
                          .then(res => {
                            axios
                              .put(
                                "/api/users/" + res.data[0].pk + "/",
                                this.tj_u_info
                              )
                              .then(res => {
                                this.tj_u_info = {
                                  username: "",
                                  is_superuser: false,
                                  join: "",
                                  mobile: "",
                                  remark: ""
                                };
                                this.tj_hy_Visible = false;
                                this.$message.success("创建成功");
                              })
                              .catch(res => {
                                this.$message.error("创建失败");
                              });
                          });
                      })
                      .catch(() => {
                        this.$message.error("创建失败");
                      });
                  }
                }
              }
            }
          }
        }
      }
    },
    rfh() {}
  },
  created() {
    const AUTH_TOKEN = localStorage.getItem("token");
  }
};
</script>

<style>
.hygl_card {
  height: 100%;
  margin-top: 20px;
  white-space: pre-line;
  text-align: center;
}
.el-input {
  width: 100px;
}
</style>