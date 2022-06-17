<template>
<div class="warpper_tree">
<div class="menu_tree">
<el-row class="tac">
    <el-col >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" @click="homeroute">
          <span >主页</span>
        </el-menu-item>
        <el-sub-menu index="2" >
          <template #title>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item one</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="2-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title>item four</template>
            <el-menu-item index="2-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" @click="store">
          <span>仓库</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="5" @click="sale">
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</el-row>
</div>
 
</div>

<div style="width:85%;" class="routerlocat">
<router-view></router-view>
</div>

</template>

<script lang="ts" >
import router from '@/router';
import { defineComponent,onMounted } from 'vue'
import {useRoute,useRouter} from "vue-router"
export default defineComponent({
setup(){
// 定义路由配置
const roue = useRoute();
const rotuer = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
onMounted(()=>{
  homeroute();
})

// 嵌套路由配置
const homeroute  = ()=>{
  rotuer.push('viewhome')
}

const sale = ()=>{
  rotuer.push('salepanel')
}

const store = ()=>{
  router.push('store')
}
return{
    handleOpen,
    handleClose,
    homeroute,
    sale,
    close,
    store
}
}
})



</script>

<style scoped>
.warpper_tree{
    /* width: 100%; */
    margin-top:20px ;
    display: flex;

}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.menu_tree{
  /* width: 250px; */
  width: 15%;
}

.routerlocat{
  position: absolute;
  right: 0px;
  top: 88px;
}
</style>