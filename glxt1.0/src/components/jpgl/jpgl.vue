<template>
  <div v-loading="loading">
    <el-button @click.prevent="tj_rd_click() ">添加奖励</el-button>
    <el-card class="reward_card" v-for="reward in all_rewards" :key="reward.pk">
      <div>
        奖励编号：{{reward.pk}}
        奖励名称：{{reward.reward_name}}
        奖励详细内容：{{reward.reward_content}}
        脚印值：{{reward.reward_join}}
        奖励数量：{{reward.reward_num}}
      </div>

      <div class="js_bt">
        <el-button @click.prevent="xg_rd_click(reward.pk) ">修改</el-button>
        <el-button @click.prevent="delete_jl_click(reward.pk) ">删除</el-button>
      </div>
    </el-card>
    <!--添加奖励-->
    <el-dialog title="添加奖励" :visible.sync="tj_rd_Visible">
      <!-- hhh-->
      <el-form ref="form" :model="tjrd_info" label-width="200px">
        <el-form-item label="奖励名称:">
          <el-input v-model="tjrd_info.reward_name" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="奖励内容:">
          <el-input
            type="textarea"
            maxlength="2000"
            v-model="tjrd_info.reward_content"
            style="width:100%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="join值:">
          <el-input v-model="tjrd_info.reward_join" style="width:100%;"></el-input>
        </el-form-item>

        <el-form-item label="数量:">
          <el-input v-model="tjrd_info.reward_num" style="width:100%;"></el-input>
        </el-form-item>
      </el-form>
      <!-- hhh -->

      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button
          type="primary"
          @click="finish_hd_Visible = false"
          @click.prevent="tj_finish_click() "
        >确 定</el-button>
      </div>
    </el-dialog>

    <!--修改奖励-->
    <el-dialog title="修改奖励" :visible.sync="xg_rd_Visible">
      <!-- hhh-->
      <el-form ref="form" :model="tjrd_info" label-width="200px">
        <el-form-item label="奖励名称:">
          <el-input v-model="xgrd_info.reward_name" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="奖励内容:">
          <el-input
            type="textarea"
            maxlength="2000"
            v-model="xgrd_info.reward_content"
            style="width:100%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="join值:">
          <el-input v-model="xgrd_info.reward_join" style="width:100%;"></el-input>
        </el-form-item>

        <el-form-item label="数量:">
          <el-input v-model="xgrd_info.reward_num" style="width:100%;"></el-input>
        </el-form-item>
      </el-form>
      <!-- hhh -->

      <div slot="footer" class="dialog-footer" style="text-align:center;">
        <el-button
          type="primary"
          @click="finish_hd_Visible = false"
          @click.prevent="xg_finish_click() "
        >修改</el-button>
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
      all_rewards: [],
      tjrd_info: {
        reward_name: null,
        reward_content: null,
        reward_join: null,
        reward_num: null
      },
      xgrd_info: {
        reward_name: null,
        reward_content: null,
        reward_join: null,
        reward_num: null
      },
      u_id: null,
      loading: true,
      join: 0,
      u_name: null,
      t_join: 0,
      t_num: 0,
      tj_rd_Visible: false,
      xg_rd_Visible: false,
      t_id: null
    };
  },
  methods: {
    xg_rd_click(id) {
      this.t_id = id;
      this.xg_rd_Visible = true;
      axios.get("/api/rewards/" + id + "/").then(res => {
        this.xgrd_info = res.data;
      });
    },
    xg_finish_click() {
      axios.put("/api/rewards/" + this.t_id + "/", this.xgrd_info).then(() => {
        this.$message.success("修改成功");
        this.rfh();
        this.xg_rd_Visible = false;
      }).catch(() => {
          this.$message.error("修改失败");
        });
    },
    tj_rd_click() {
      this.tj_rd_Visible = true;
    },
    tj_finish_click() {
      axios
        .post("/api/rewards/", this.tjrd_info)
        .then(res => {
          this.$message.success("添加成功");
          this.rfh();
          this.tj_rd_Visible = false;
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    delete_jl_click(i) {
      this.$confirm("您确定删除这个奖励吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        axios.delete("/api/rewards/" + i + "/").then(res => {
          this.$message.success("删除成功");
          this.rfh();
        });
      });
    },
    rfh() {
      const AUTH_TOKEN = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      axios.get("/api/rewards/").then(res => {
        this.all_rewards = res.data;
        //console.log(res.data);
      });
      this.tjrd_info = {
        reward_name: null,
        reward_content: null,
        reward_join: null,
        reward_num: null
      };
      this.xgrd_info = {
        reward_name: null,
        reward_content: null,
        reward_join: null,
        reward_num: null
      };
    }
  },
  created() {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    axios.get("/api/rewards/").then(res => {
      this.all_rewards = res.data;
      console.log(res.data);
    });
    this.tjrd_info = {
      reward_name: null,
      reward_content: null,
      reward_join: null,
      reward_num: null
    };
    this.xgrd_info = {
      reward_name: null,
      reward_content: null,
      reward_join: null,
      reward_num: null
    };
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