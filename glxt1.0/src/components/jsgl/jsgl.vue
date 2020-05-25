<template>
  <div>
    <el-card class="jsgl_card">
      <el-input v-model="search" placeholder="请输入搜索内容" style="width:100%"></el-input>
      <el-button round class="search_bt" @click.prevent="search_id() ">搜索ID</el-button>
      <el-button round class="search_bt" @click.prevent="search_name() ">搜索用户名</el-button>
    </el-card>
    <el-card class="u_info_card">
      <div>用户编号：{{u_info.pk}}</div>
      <div>用户名：{{u_info.username}}</div>
      <div>手机号：{{u_info.mobile}}</div>
      <div>脚印值：{{u_info.join}}</div>
      <div>备注：{{u_info.remark}}</div>
    </el-card>
    <el-card class="u_info_card">
      <div>未完成</div>
      <div><el-table :data="not_finish" border style="width: 1700px">
        <el-table-column prop="id" label="记录编号" width="90px"></el-table-column>
        <el-table-column prop="rd_id" label="奖励编号" width="90px"></el-table-column>
        <el-table-column prop="rd_name" label="奖励名" width="280px"></el-table-column>
        <el-table-column prop="rd_content" label="奖励内容" width="503px"></el-table-column>
        <el-table-column prop="num" label="兑换数量" width="280px"></el-table-column>
        <el-table-column prop="finish" label="完成情况" width="280px">
          <template slot-scope="scope">
            <el-switch
              @change="change_finish(scope.row.id,scope.row.finish)"
              v-model="scope.row.finish"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table></div>
    </el-card>
    <el-card class="u_info_card">
      <div>已完成</div>
      <div><el-table :data="finish" border style="width: 1700px">
        <el-table-column prop="id" label="记录编号" width="90px"></el-table-column>
        <el-table-column prop="rd_id" label="奖励编号" width="90px"></el-table-column>
        <el-table-column prop="rd_name" label="奖励名" width="280px"></el-table-column>
        <el-table-column prop="rd_content" label="奖励内容" width="503px"></el-table-column>
        <el-table-column prop="num" label="兑换数量" width="280px"></el-table-column>
        <el-table-column prop="finish" label="兑换情况" width="280px">
          <template slot-scope="scope">
            <el-switch
              @change="change_finish(scope.row.id,scope.row.finish)"
              v-model="scope.row.finish"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table></div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      u_info: {
        pk: "",
        username: "",
        is_superuser: "",
        join: "",
        last_login: "",
        mobile: "",
        remark: ""
      },
      record: null,
      finish: [],
      not_finish: [],
      t_user: null,
      reward: null
    };
  },
  methods: {
    search_id() {
      axios
        .get("/api/users/" + this.search + "/")
        .then(res => {
          if (true) {
            this.u_info = res.data;
            this.t_user = this.u_info.pk;
            this.jlcx();
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
            this.jlcx();
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
    jlcx() {
       this.finish = [];
       this.not_finish = [];
      axios.get("/api/hasrd/get/?id=" + this.t_user).then(res => {
         //console.log(res)
        var record = res.data;
        axios.get("/api/rewards/").then(res2 => {
          var reward = res2.data;

          var temp = [];
          for (var i in record) {
            for (var j in reward) {
               
              if (record[i].reward == reward[j].pk) {
                 
                if (record[i].finish == true) {
                   //console.log(reward[j])
                  this.finish.push({
                    id: record[i].pk,
                    rd_id: reward[j].pk,
                    rd_name: reward[j].reward_name,
                    rd_content: reward[j].reward_content,
                    num: record[i].num,
                    finish: record[i].finish
                  });
                  break;
                } else {
                  this.not_finish.push({
                    id: record[i].pk,
                    rd_id: reward[j].pk,
                    rd_name: reward[j].reward_name,
                    rd_content: reward[j].reward_content,
                    num: record[i].num,
                    finish: record[i].finish
                  });
                  break;
                }
              }
            }
          }
        });
      });
    },
    change_finish(id,finish){
       axios.put('/api/hasrd/'+id+'/',{"finish":finish,"finish_time":"2000-01-01T00:00:00Z"}).then(()=>{
          this.$message.success("修改成功");
          this.jlcx();
       })

    }
  },
  created() {
    //console.log(this.information);
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  }
};
</script>

<style>
.search_bt {
  margin-top: 20px;
}
.u_info_card {
  text-align: left;
  margin-top: 20px;
}
</style>