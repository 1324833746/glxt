<template>
  <div class="login-wrap">
    <el-form 
    class="login-form"
    :label-position="top" 
    label-width="80px" 
    :model="formdata">
    <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
        <el-button 
        @click.prevent="handlelogin()"
        class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'Qs'
export default {
  data(){
    return{
      top:'',
      formdata:{
        username:'',
        password:'',
      },
    }
  },
  methods:{
    handlelogin(){
      axios.post('/api/login/in/',this.formdata)
      .then((res)=>{
        console.log(res)
        console.log(this.formdata)
        console.log(this.formdata.password)
        const{
          ret,
          msg,

        } = res.data
        //成功  
        if(ret===0){
          //跳转到home
          this.$router.push({name:'home'})
          //提示成功
          this.$message.success('登陆成功');
        }
        else
        {
          this.$message.error(msg);
        }
        


      })
    }
  }
};
</script>

<style>
.login-wrap{
  height:100%;
  background-color:#F56C6C;
  display:flex;
  justify-content: center;
  align-items: center;
  border: 1px #DCDFE6;
}
.login-wrap .login-form{
  width: 400px;
  background-color: #ffffff;
  border-radius:5px;
  padding: 30px;
}
.login-wrap .login-bun{
  width: 100%;
}
</style>