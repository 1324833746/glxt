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
        <el-button @click.prevent="bmclick(activity.pk) ">{{activity.text}}</el-button>
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
function sfgq(time) {
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
  var now = new Date().Format("yyyy-MM-ddTHH:mm:ssZ");
  if (parseInt(now.slice(0, 4)) < parseInt(time.slice(0, 4))) {
    return 1;
  } else if (parseInt(now.slice(0, 4)) > parseInt(time.slice(0, 4))) {
    return 0;
  } else {
    if (parseInt(now.slice(5, 7)) < parseInt(time.slice(5, 7))) {
      return 1;
    } else if (parseInt(now.slice(5, 7)) > parseInt(time.slice(5, 7))) {
      return 0;
    } else {
      if (parseInt(now.slice(8, 10)) < parseInt(time.slice(8, 10))) {
        return 1;
      } else if (parseInt(now.slice(8, 10)) > parseInt(time.slice(8, 10))) {
        return 0;
      } else {
        if (parseInt(now.slice(11, 13)) < parseInt(time.slice(11, 13))) {
          return 1;
        } else if (parseInt(now.slice(11, 13)) > parseInt(time.slice(11, 13))) {
          return 0;
        } else {
          if (parseInt(now.slice(14, 16)) < parseInt(time.slice(14, 16))) {
            return 1;
          } else if (
            parseInt(now.slice(14, 16)) > parseInt(time.slice(14, 16))
          ) {
            return 0;
          } else {
            if (parseInt(now.slice(17, 19)) < parseInt(time.slice(17, 19))) {
              return 1;
            } else if (
              parseInt(now.slice(17, 19)) > parseInt(time.slice(17, 19))
            ) {
              return 0;
            } else {
              return 0;
            }
          }
        }
      }
    }
  }
}
import Vue from "vue";
import axios from "axios";
export default {
  data() {
    return {
      all_activities: [],
      u_id: null,
      bm_state: null,
      has_bm: [],
      loading: true
    };
  },
  methods: {
    rfh() {
      const AUTH_TOKEN = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      axios.get("/api/users/get?token=1").then(res => {
        this.u_id = res.data[0].pk;
        axios.get("api/hasac/get?id=" + this.u_id).then(res2 => {
          this.has_bm = res2;
          axios.get("/api/activities/").then(res3 => {
            this.all_activities = res3.data;
            for (var i in this.all_activities) {
              this.all_activities[i].state = true;
              this.all_activities[i].text = "join";
              if (sfgq(this.all_activities[i].activity_deadline) == 0) {
                this.all_activities[i].text = "已过期";
                this.all_activities[i].state = false;
              } else {
                if (this.all_activities[i].activity_num <= 0) {
                  this.all_activities[i].text = "人数已满";
                  this.all_activities[i].state = false;
                }
              }
              //console.log(i);
            }
            //console.log(this.all_activities);
            for (var i in this.all_activities) {
              for (var j in this.has_bm.data) {
                //console.log(this.has_bm.data[j]);
                if (
                  this.u_id == this.has_bm.data[j].user &&
                  this.has_bm.data[j].activity == this.all_activities[i].pk
                ) {
                  this.all_activities[i].state = true;
                  if (sfgq(this.all_activities[i].activity_deadline) == 1) {
                    this.all_activities[i].text = "取消join";
                    this.all_activities[i].state = true;
                  } else if (
                    sfgq(this.all_activities[i].activity_deadline) == 0
                  ) {
                    if (this.has_bm.data[j].finish == false) {
                     // console.log(j);
                      this.all_activities[i].text = "已参与";
                      this.all_activities[i].state = false;
                    } else {
                      this.all_activities[i].text = "已完成";
                      this.all_activities[i].state = false;
                    }
                  }

                  //console.log(this.all_activities[i]);
                  //console.log(this.all_activities[i].text);
                }
              }
            }
          });
        });
      });
    },
    bmclick(bh) {
      for (var i in this.all_activities) {
        if (this.all_activities[i].pk == bh) {
          if (this.all_activities[i].state == false) {
            break;
          }
          if (this.all_activities[i].state == true) {
            this.loading = true;
          }
          //console.log(this.all_activities[k]);
          if (
            this.all_activities[i].text == "取消join" &&
            this.all_activities[i].state == true
          ) {
            //已经报名
            //
            // console.log(this.all_activities[i].state);
            for (var j in this.has_bm.data) {
              if (this.has_bm.data[j].activity == bh) {
                //console.log(this.has_bm.data[j]);
                axios
                  .delete("api/hasac/" + this.has_bm.data[j].pk + "/")
                  .then(res => {
                    //console.log("1")
                    var t = this.all_activities;
                    this.all_activities = 1;
                    t[i].text = "join";
                    this.all_activities = t;
                    //this.all_activities[i].state = false;
                    //this.all_activities[i].text = "join";

                    //******************************************* *
                    this.rfh();
                    //******************************************* *
                    sleep(1000);
                    this.$message.success("取消报名成功");
                    this.loading = false;
                  });
                var temp_num = this.all_activities[i];
                temp_num.activity_num = this.all_activities[i].activity_num + 1;
                axios.put(
                  "api/activities/" + this.all_activities[i].pk + "/",
                  temp_num
                );
              }
            }
          } else if (
            this.all_activities[i].text == "join" &&
            this.all_activities[i].state == true
          ) {
            console.log(this.all_activities[i].state);
            const temp = {};
            temp["user"] = this.u_id;
            temp.activity = bh;
            temp.finish = false;
            temp.admin = null;
            //console.log(temp);
            //未报名
            axios.post("api/hasac/", temp).then(res => {
              //console.log("1")
              var t = this.all_activities;
              this.all_activities = 1;
              t[i].text = "取消join";
              this.all_activities = t;
              //this.all_activities[i].state = true;
              //this.all_activities[i].text = "取消join";
              //
              this.rfh();
              //
              sleep(1000);
              this.$message.success("报名成功");
              this.loading = false;
            });
            var temp_num = this.all_activities[i];
            temp_num.activity_num = this.all_activities[i].activity_num - 1;
            axios.put(
              "api/activities/" + this.all_activities[i].pk + "/",
              temp_num
            );
          }
        }
      }
    }
  },
  created() {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.get("/api/users/get?token=1").then(res => {
      this.u_id = res.data[0].pk;
      axios.get("api/hasac/get?id=" + this.u_id).then(res2 => {
        this.has_bm = res2;
        axios.get("/api/activities/").then(res3 => {
          this.all_activities = res3.data;
          for (var i in this.all_activities) {
            this.all_activities[i].state = true;
            this.all_activities[i].text = "join";
            if (sfgq(this.all_activities[i].activity_deadline) == 0) {
              this.all_activities[i].text = "已过期";
              this.all_activities[i].state = false;
            } else {
              if (this.all_activities[i].activity_num <= 0) {
                this.all_activities[i].text = "人数已满";
                this.all_activities[i].state = false;
              }
            }
            //console.log(i);
          }
          //console.log(this.all_activities);
          for (var i in this.all_activities) {
            for (var j in this.has_bm.data) {
              //console.log(this.has_bm.data[j]);
              if (
                this.u_id == this.has_bm.data[j].user &&
                this.has_bm.data[j].activity == this.all_activities[i].pk
              ) {
                this.all_activities[i].state = true;
                if (sfgq(this.all_activities[i].activity_deadline) == 1) {
                  this.all_activities[i].text = "取消join";
                  this.all_activities[i].state = true;
                } else if (
                  sfgq(this.all_activities[i].activity_deadline) == 0
                ) {
                  if (this.has_bm.data[j].finish == false) {
                    //console.log(j);
                    this.all_activities[i].text = "已参与";
                    this.all_activities[i].state = false;
                  } else {
                    this.all_activities[i].text = "已完成";
                    this.all_activities[i].state = false;
                  }
                }

                //console.log(this.all_activities[i]);
                //console.log(this.all_activities[i].text);
              }
            }
          }
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