<template>
  <div v-loading="loading">
    <p>我的join值:{{join}}</p>
    <el-card class="reward_card" v-for="(reward,i) in all_rewards" :key="reward.pk">
      <div>
        奖励编号：{{reward.pk}}
        奖励名称：{{reward.reward_name}}
        奖励详细内容：{{reward.reward_content}}
        脚印值：{{reward.reward_join}}
        奖励数量：{{reward.reward_num}}
      </div>

      <div class="js_bt">
        <el-button @click.prevent="jlclick(i) ">join</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
}

import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      all_rewards: [],
      u_id: null,
      loading: true,
      join: 0,
      u_name: null,
      t_join: 0,
      t_num: 0
    };
  },
  methods: {
    jlclick(i) {
      console.log(this.all_rewards[i]);
      if (this.all_rewards[i].reward_join > this.join) {
        this.$message.error("您的join值不足，请参加活动积累");
      } else {
        this.$confirm("您确定join这个奖励吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$prompt("请输入数量", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              inputPattern: /^[1-9]\d*$/,
              inputErrorMessage: "请输入一个正整数",
              center:true,
            }).then(({ value }) => {
              this.t_num = value;

              if (this.t_num > this.all_rewards[i].reward_num) {
                this.$message.error("数量不足");
              } else {
                this.t_join =
                  this.join - value * this.all_rewards[i].reward_join;
                if (this.t_join < 0) {
                  this.$message.error("join值不足");
                } else {
                  console.log(this.join);
                  console.log(value);
                  console.log(this.all_rewards[i].reward_join);
                  axios.put("/api/users/" + this.u_id + "/", {
                    join: this.t_join,
                    username: this.u_name
                  });
                  axios.put("/api/rewards/" + this.all_rewards[i].pk + "/", {
                    reward_num: this.all_rewards[i].reward_num - this.t_num,
                    reward_content: this.all_rewards[i].reward_content,
                    reward_join: this.all_rewards[i].reward_join,
                    reward_name: this.all_rewards[i].reward_name
                  });
                  axios
                    .post("/api/hasrd/", {
                      user: this.u_id,
                      reward: this.all_rewards[i].pk,
                      finish: false,
                      num: value,
                      finish: false,
                      finish_time: "2019-05-24T23:59:00Z"
                    })
                    .then(res => {
                      this.$message({
                        type: "success",
                        message: "join成功,"
                      });
                      this.rfh();
                    });
                }
              }
            }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消join"
            });
          });

            /*this.$message({
              type: "success",
              message: "join成功!"
            });*/
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消join"
            });
          });
      }
    },
    rfh() {
      const AUTH_TOKEN = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      axios.get("/api/users/get?token=1").then(res => {
        this.u_id = res.data[0].pk;
        this.join = res.data[0].join;
        this.u_name = res.data[0].username;
      });
      axios.get("/api/rewards/").then(res => {
        this.all_rewards = res.data;
        console.log(res.data);
      });
    }
  },
  created() {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.get("/api/users/get?token=1").then(res => {
      this.u_id = res.data[0].pk;
      this.join = res.data[0].join;
      this.u_name = res.data[0].username;
    });
    axios.get("/api/rewards/").then(res => {
      this.all_rewards = res.data;
      console.log(res.data);
    });
  },
  mounted() {
    //console.log("sssss")
    this.loading = false;
  }
};
</script>

<style>
.reward_card {
  height: 100%;
  margin-top: 20px;
  white-space: pre-line;
  text-align: left;
}
.el-input {
  width: 100px;
}
.js_bt {
  text-align: center;
}
</style>