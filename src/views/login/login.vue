<template >
  <div class="wrapper">
    <!-- 内容区域 -->
    <div class="content">
      <div class="title_login">登陆</div>
      <!-- <div class="from_subimt">
            <div class="height_input"> 账号：<el-input v-model="userData.name" placeholder="请输入账号"   class="inputSize" /></div>
            <div class="height_input"> 密码：<el-input
                v-model="userData.password"
                type="password"
                placeholder="请输入密码"
                show-password
                class="inputSize"
                /></div>
                </div> -->
     <el-form
    :label-position="labelPosition"
    label-width="100px"
    :model="userData"
    style="max-width: 460px"
  >
    <el-form-item label="用户名：">
      <el-input v-model="userData.name" />
    </el-form-item>
    <el-form-item label="密码：" prop="pass">
      <el-input v-model="userData.password"  type="password"/>
    </el-form-item>
  </el-form>
    <el-button type="primary" @click="gohome">登陆</el-button>
    </div>
  </div>
</template>
<script  lang="ts" >
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
interface UserData {
  name: string;
  password: string;
  Verification_code?: string;
}
interface LoginMsg {
  msg: string;
  status: number;
  token?: string;
}
export default defineComponent({
  setup() {
    const labelPosition = ref<string>("right");
    const router = useRouter();
    const userData = reactive<UserData>({
      name: "",
      password: "",
    });
    // 这里发送网络请求
    function gohome() {
      axios.post("http://127.0.0.1:8081/api/login", userData).then((res) => {
        const userlogin: LoginMsg = res.data;
        console.log(res)
        if (userlogin.status === 10001) {
          // 用户账号或密码不正确返回错误信息
          return errorF(userlogin.msg);
        } else if (userlogin.status === 200 && userlogin.token != undefined) {
          //  用户信息正确并且把token存入locatStore。
          localStorage.setItem("token", userlogin.token);
          sucessF(userlogin.msg);
          setTimeout(() => {
            //  params 中的key要匹配动态路由中的值
            // 路由跳转
            router.push({ name: "home", params: { username: userData.name } });
          }, 2000);
        }
      });
    }
    // 登陆成功的提示
    const sucessF = (msg:string) => {
      ElMessage({
        message: msg,
        grouping: true,
        type: "success",
      });
    };
    // 登陆失败的提示
    const errorF = (msg:string) => {
      ElMessage({
        message: msg,
        grouping: true,
        type: "error",
      });
    };

    return {
      // 请保持上变量后函数的形式
      labelPosition,
      userData,
      gohome,
     
    };
  },
});
</script>

<style scoped>
.flex_YZM {
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  width: 100%;
  height: 100vh;
  background-color: green;
}

.content {
  width: 500px;
  height: 250px;
  position: absolute;
  z-index: 2;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  border-radius: 16px;
}

.inputSize {
  width: 200px;
  margin: 10px 0 10px 0;
}
.title_login {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}

.icon_inline {
  display: inline-block;
  line-height: 50px;
  text-align: center;
}

.height_input {
  height: 50px;
  width: 100%;
}

/* .from_subimt{
    background-color: blue;
} */

.inputSize_YZM {
  width: 100px;
  margin: 10px 0 10px 0;
}
</style>