<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="information" label-width="200px">
        <el-form-item label="id:">
          <el-input v-model="information.id" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input v-model="information.username" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:">
          <el-input v-model="information.is_superuser" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="脚印值:">
          <el-input v-model="information.join" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="上次登录:">
          <el-input v-model="information.last_login" style="width:100%;" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input v-model="information.phone" style="width:100%;" :disabled="this.phone_state"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" maxlength="200" v-model="information.remark" style="width:100%;" :disabled="this.note_state"></el-input>
        </el-form-item>
        <el-button @click.prevent="xgxxclick()" type="danger">{{xg_bt_text}}</el-button>
      </el-form>
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
      },
      xg_formdata: {
        username:"",
        mobile:"",
        remark:"",
      },
      xg_bt_text: "修改信息",
      username_state:true,
      phone_state:true,
      note_state:true,
    };
  },
   methods: {
    xgxxclick() {
      this.xg_formdata.username = this.information.username;
      this.xg_formdata.mobile = this.information.phone;
      this.xg_formdata.remark = this.information.remark;
      if(this.xg_bt_text == "修改信息"){
        this.username_state = false;
        this.phone_state = false;
        this.note_state = false;
        this.xg_bt_text = "确认修改";
      }
      else if(this.xg_bt_text == "确认修改"){
        this.username_state = true;
        this.phone_state = true;
        this.note_state = true;
        axios
        .put("/api/users/" + this.information.id + '/', this.xg_formdata)
        .then(res => {
          this.$message.success("修改成功");
          this.xg_bt_text = "修改信息";
        }).catch(res => {
          this.$message.error("修改失败");
        })

      }
    },
  },
  created() {
    //console.log(this.information);
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.get("/api/users/get?token=1").then(res => {
      this.information.id = res.data[0].pk;
      this.information.username = res.data[0].username;
      if (res.data[0].is_superuser) {
        this.information.is_superuser = "管理员";
      } else {
        this.information.is_superuser = "会员";
      }
      this.information.join = res.data[0].join;
      this.information.last_login = res.data[0].last_login.slice(0,4) + "年" + res.data[0].last_login.slice(5,7) + "月" + res.data[0].last_login.slice(8,10) + "日" + res.data[0].last_login.slice(11,13) + "时" + res.data[0].last_login.slice(14,16) + "分" + res.data[0].last_login.slice(17,19) + "秒";
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