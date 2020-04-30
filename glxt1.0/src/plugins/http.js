//插件模块
import axios from 'axios'
const MyHttpServer={}
MyHttpServer.install =  (Vue) =>{
    
    axios.defaults.baseURL = 'http://39.107.26.110' 
    //axios.defaults.baseURL = 'http://localhost:8000' 
   //'http://localhost:6070/'
    // 4. 添加实例方法
    Vue.prototype.$http = axios
  }
  export default MyHttpServer