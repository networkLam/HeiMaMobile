<template>
    <div>
        <div class="warpper">
            <!-- logo -->
            <div class="logo">logo</div>
            <div class="list_right">
            <div class="padding_right">欢迎，{{userID.username}}</div>
            <div class="padding_right"><img src="../../../assets/guoqi.webp" alt="" class="PI_icon"></div>
            <div class="padding_right"> <el-button type="danger" @click="sign_out">退出</el-button></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent , ref,} from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
    setup() {
       const userID = useRoute().params
       const userouter = useRouter();
        // console.log(useRoute())
        const store = useStore();
   const  sign_out = ()=>{
    //    清除token并调回登陆界面
    // localStorage.removeItem("token")
    store.commit("delToken")
    userouter.push('/login')
   }
       return {
           userID,sign_out
       }
    },
})
</script>
<style>
.warpper{
    background-color: #fff;
    height: 70px;
    box-shadow: 7px 0 7px 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;

}

.PI_icon{
    width: 50px;
    height: 50px;
    /* background-color: pink; */
    border-radius: 50%;
   margin-top: 10px;
}

.padding_right{
    line-height: 70px;
    height: 70px;
    color: #424245;
    padding: 0 10px 0 10px;

}
.logo{
width: 50px;
height: 50px;
border-radius: 50%;
background-color: pink;
text-align: center;
line-height: 50px;
margin: 10px;
}

.list_right{
    display: flex;
    justify-content: flex-end;
    width: 600px;
    /* background-color: pink; */
}
</style>