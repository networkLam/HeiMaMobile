import axios from "axios";
const baseURL = 'http://127.0.0.1:8081';
/*
 *封装get方法
 *@param{String} url [请求地址]
 *@param{Object} params 请求参数
 */
 interface LoginData{
   msg:string,
   status : number
 }
 const axiosInstance = axios.create({
    baseURL, 
    timeout: 30000,
  });
// 请求拦截
axiosInstance.interceptors.request.use(
    function (config) {  
      const config_ = config;
      if (config_) {
        config_.headers!.Authorization = localStorage.getItem("token") as string;
      }
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    },
  );

// 响应拦截
axiosInstance.interceptors.response.use(res=>{
    const login_data:LoginData = res.data
    const getview = res;
    if(res.config.url == '/api/checktoken'){
        if(login_data.status != 200){
         return Promise.reject(404)
        }
    }
    // if(res.config)
    return getview;
})


export default axiosInstance