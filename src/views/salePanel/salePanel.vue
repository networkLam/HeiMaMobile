<template>
   <input type="text" name="" id="" v-model="queryStr">
   <div>
       <h2>列表过滤</h2>
       <table>
           <tr>
               <th>姓名</th>
               <th>年龄</th>
           </tr>
           <tr v-for="(item,index) in filUser" :key="index">
            <th>{{item.name}}</th>
            <th>{{item.age}}</th>
           </tr>
       </table>
   </div>
</template>

<script lang="ts">
import { defineComponent,reactive,watch,ref,computed} from 'vue'
interface User{
    name : string,
    age : number
}
export default defineComponent({
    setup() {
        let queryStr =ref<string>('' ) 
       const userData = reactive<User[]>([{
           name:"lam",
           age : 23
       },{
           name:"jay",
           age : 24
       },{
           name:"eason",
           age : 25
       },{
           name:"jason",
           age : 23
       },])
    //    使用计算属性去完成。
       const filUser = computed(()=>{
        //  是用filter函数进行过滤 filter不会修改源数组
           return userData.filter((item)=>{
               return item.name.indexOf(queryStr.value) !== -1
           })
       })
       return {
           userData,
           queryStr,
           filUser
       }
    },
})
</script>
