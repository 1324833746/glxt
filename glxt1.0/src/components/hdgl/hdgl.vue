<template>
  <div v-loading="loading">
    <el-card class="activity_card" v-for="activity in all_activities" :key="activity.pk">
      <div>
        活动编号：{{activity.pk}}
        活动名称：{{activity.activity_name}}
        活动详细内容：{{activity.activity_content}}
        奖励脚印值：{{activity.activity_join}}
        活动名额：{{activity.activity_num}}/{{activity.activity_maxnum}}
        截止日期：{{activity.activity_deadline}}
      </div>

      <div class="bm_bt">
        <el-button @click.prevent="finish_click(activity.pk,activity.activity_join) ">完成活动</el-button>
        <el-button @click.prevent="xghdclick(activity.pk) ">修改活动</el-button>
        <el-button @click.prevent="delete_click(activity.pk) ">删除活动</el-button>
      </div>
    </el-card>
    <el-dialog title="修改活动" :visible.sync="xghd_Visible">
      <el-form ref="form" :model="xghd_info" label-width="200px">
        <el-form-item label="活动名称:">
          <el-input v-model="xghd_info.activity_name" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="活动内容:">
          <el-input
            type="textarea"
            maxlength="2000"
            v-model="xghd_info.activity_content"
            style="width:100%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="join值:">
          <el-input v-model="xghd_info.activity_join" style="width:100%;"></el-input>
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
          <el-input v-model="xghd_info.activity_maxnum" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="剩余名额:">
          <el-input v-model="xghd_info.activity_num" style="width:100%;"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="xghd_Visible = false">取 消</el-button>
        <el-button type="primary" @click="xghd_Visible = false" @click.prevent="qdxg_click() ">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 完成活动-->
    <el-dialog title="完成活动" :visible.sync="finish_hd_Visible" v-loading="loading">
      <!-- hhh-->

      <el-table :data="tableData" border style="width: 901px">
        <el-table-column prop="record_id" label="记录编号" width="90px"></el-table-column>
        <el-table-column prop="user_id" label="用户编号" width="90px"></el-table-column>
        <el-table-column prop="name" label="用户名" width="180px"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="180px"></el-table-column>
        <el-table-column prop="join" label="用户join值" width="180px"></el-table-column>
        <el-table-column prop="finish" label="完成情况" width="180px">
          <template slot-scope="scope">
            <el-switch
              @change="change_finish(scope.row.record_id,scope.row.finish,scope.row.user_id,scope.row.join,scope.row.name)"
              v-model="scope.row.finish"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- hhh -->

      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button
          type="primary"
          @click="finish_hd_Visible = false"
          @click.prevent="qd_finish_click() "
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      all_activities: [],
      u_id: null,
      bm_state: null,
      has_bm: [],
      loading: true,
      xghd_Visible: false,
      finish_hd_Visible: false,
      xghd_info: {
        pk: "",
        activity_name: "",
        activity_content: "",
        activity_deadline: "",
        activity_join: 0,
        activity_num: 0,
        activity_maxnum: 0,
        activity_time: ""
      },
      t_deadline: null,
      t_bh: null,
      t_join: null,
      tableData: [],
      finish_value: null,
      loading:false,
    };
  },
  methods: {
    rfh() {
      const AUTH_TOKEN = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      axios.get("/api/activities/").then(res => {
        this.all_activities = res.data;
      });
    },
    delete_click(bh) {
      this.$confirm("您确定删除这个活动吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios.delete("/api/activities/" + bh + "/").then(res => {
          this.$message.success("删除成功");
          this.rfh();
        });
      });
    },
    xghdclick(bh, join) {
      this.xghd_Visible = true;
      axios.get("/api/activities/" + bh + "/").then(res => {
        this.xghd_info = res.data;
        this.t_deadline = new Date(
          this.xghd_info.activity_deadline.slice(0, 4) +
            "-" +
            this.xghd_info.activity_deadline.slice(5, 7) +
            "-" +
            this.xghd_info.activity_deadline.slice(8, 10) +
            " " +
            this.xghd_info.activity_deadline.slice(11, 13) +
            ":" +
            this.xghd_info.activity_deadline.slice(14, 16) +
            ":" +
            this.xghd_info.activity_deadline.slice(17, 19)
        );
      });
    },
    qdxg_click() {
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
      this.xghd_info.activity_deadline = this.t_deadline.Format(
        "yyyy-MM-ddTHH:mm:ssZ"
      );

      axios
        .put("/api/activities/" + this.xghd_info.pk + "/", this.xghd_info)
        .then(res => {
          this.$message.success("修改成功");
          this.rfh();
        });
    },
    finish_click(bh, join) {
      this.tableData = [];
      this.finish_hd_Visible = true;
      this.t_bh = bh;
      this.t_join = join;
      axios.get("/api/hasac/get/?activity=" + bh).then(res => {
        var record = res.data;
        axios.get("/api/users/").then(res2 => {
          var users = res2.data;
          for (var i in record) {
            for (var j in users) {
              if (record[i].user != null && record[i].user == users[j].pk) {
                var temp = {
                  record_id: "",
                  user_id: "",
                  name: "",
                  mobile: "",
                  join: 0,
                  finish: false
                };
                temp.record_id = record[i].pk;
                temp.user_id = record[i].user;
                temp.name = users[j].username;
                temp.mobile = users[j].mobile;
                temp.join = users[j].join;
                temp.finish = record[i].finish;
                console.log(temp);
                this.tableData.push(temp);
                break;
              }
            }
          }
        });
      });
    },
    qd_finish_click() {
      console.log(this.t_bh + "-" + this.t_join);
      //
    },
    change_finish(id, finish, user_id, user_join, name) {
      /*console.log(
        id + "-" + finish + "-" + user_id + "-" + user_join + "-" + this.t_join
      );*/
      this.loading = true;
      if (finish) {
        axios
          .put("/api/users/" + user_id + "/", {
            join: user_join + this.t_join,
            username: name
          })
          .then(res => {
            axios
              .put("/api/hasac/" + id + "/", {
                finish: true
              })
              .then(res2 => {
                this.$message.success("成功修改为完成");
                this.finish_click(this.t_bh, this.t_join);
                this.loading = false;
              });
          });
      } else {
        axios
          .put("/api/users/" + user_id + "/", {
            join: user_join - this.t_join,
            username: name
          })
          .then(res => {
            axios
              .put("/api/hasac/" + id + "/", {
                finish: false
              })
              .then(res2 => {
                this.$message.success("成功修改为未完成");
                this.finish_click(this.t_bh, this.t_join);
                this.loading = false;
              });
          });
      }
    }
  },

  created() {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.get("/api/activities/").then(res => {
      this.all_activities = res.data;
    });
  },
  mounted() {
    //console.log("sssss")
    this.loading = false;
  }
};
</script>

<style>
.activity_card {
  height: 100%;
  margin-top: 20px;
  white-space: pre-line;
  text-align: left;
}
.el-input {
  width: 100px;
}
.bm_bt {
  text-align: center;
}
</style>