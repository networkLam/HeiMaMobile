<template>
    <div class="warpperHome">
       <div class="textStyle">当月出货量</div>
       <div >区域可替代总量</div>
       <div class="dangyue">
           <div style="background:green">

           </div>
            <div id="indexTest" style="width:700px;height:300px"></div>
       </div>   
    </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import {region,sale} from '../../hooks/Histogram'

export default defineComponent({
    setup(){
        let myname = ref<string>('iAmViewHome')
        sale("indexTest");         
        return {
            myname,
        }
    }
})

</script>

<style scoped>
.warpperHome{
    width:800px;
    background: rgba(22,32,23,0.5);
    border-radius:12px ;
}
.textStyle{
    color: white;
    font-size: 26px;
}

.dangyue{
    display: flex;

}
</style>