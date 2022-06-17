<template>
<!-- 这是404页面 -->
    <div class="wrapper">
        <div>
             <h2>这个页面被吃掉了！</h2>
             <h2><span class="number">404</span> NotFound!</h2>
             <el-button type="success"  round @click="get_away">跳出无人区</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {useRouter} from "vue-router"
export default defineComponent({
    name:"notfount",
    setup(){
        const router = useRouter();
        document.title = '不存在这个页面';
        const get_away = ()=>{
            router.push('/login');
        }
        return {
            get_away
        }
    }
})
</script>

<style scoped>
.wrapper{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
   background-image: linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);

}
.number{
    color:white;
}
</style>