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
        <el-input v-model="formdata.passward"></el-input>
      </el-form-item>
        <el-button 
        @click.prevent="handlelogin()"
        class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      top:'',
      formdata:{
        username:'',
        passward:'',
      },
    }
  },
  methods:{
    handlelogin(){

      this.$router.push({name:'home'})
          //提示成功
      this.$message.success('登陆成功');
      this.$http.get('message',this.formdata)
      .then((res)=>{
        //console.log(res)
     //   const{
       //   data,
      //    meta:{message,status}



       // } = res.data
        //成功  
        if(status===1){
          //跳转到home
          this.$router.push({name:'home'})
          //提示成功
          this.$message.success('错了哦，这是一条错误消息');
        }
        else
        {
          this.$message.error('错了哦，这是一条错误消息');
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