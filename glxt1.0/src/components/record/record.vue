<template>
  <div v-loading="loading">
    <div v-loading="loading">
      <el-card class="record_card" v-for="reward in all_rewards" :key="reward.pk">
        <div>
          记录编号：{{reward.pk}}
          奖励编号：{{reward.reward}}
          兑换时间：{{reward.reward_time}}
          奖励名称：{{reward.name}}
          奖励内容：{{reward.content}}
          兑换数量：{{reward.join}}(join值) * {{reward.num}}(个)
          消耗join值：{{reward.join*reward.num}}
          是否领取：{{reward.finish}}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      all_rewards: [],
      u_id: null,
      my_rd: [],
      loading: true
    };
  },
  methods: {
    rfh() {}
  },
  created() {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.get("/api/users/get?token=1").then(res => {
      this.u_id = res.data[0].pk;
      axios.get("api/hasrd/get?id=" + this.u_id).then(res2 => {
        this.my_rd = res2;
        axios.get("/api/rewards/").then(res3 => {
          this.all_rewards = res3.data;
          var temp_rd = [];

          for (var i in this.all_rewards) {
            for (var j in this.my_rd.data) {
              if (
                this.u_id == this.my_rd.data[j].user &&
                this.my_rd.data[j].reward == this.all_rewards[i].pk
              ) {
                //console.log(this.my_rd.data[j].pk);
                var t = this.my_rd.data[j];
                //console.log(t)
                t.name = this.all_rewards[i].reward_name;
                t.content = this.all_rewards[i].reward_content;
                t.join = this.all_rewards[i].reward_join;
                //console.log(t);
                //this.my_rd.data[j];
                temp_rd.push(t);
                //console.log(t);
              }
            }
          }

          this.all_rewards = temp_rd;
          var compare = function(obj1, obj2) {
            var val1 = obj1.pk;
            var val2 = obj2.pk;
            if (val1 > val2) {
              return -1;
            } else if (val1 < val2) {
              return 1;
            } else {
              return 0;
            }
          };
          this.all_rewards.sort(compare)
          console.log(this.all_rewards);
          //console.log(this.my_rd);
        });
      });
    });
  },
  mounted() {
    //console.log("sssss")
    this.loading = false;
  }
};
</script>

<style>
.record_card {
  height: 100%;
  margin-top: 20px;
  white-space: pre-line;
  text-align: left;
}
.el-input {
  width: 100px;
}
</style>