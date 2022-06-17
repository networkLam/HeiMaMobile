<template>
<ihead/>
<menuTree/> 
</template>

<script lang="ts" setup>
import {ref} from "vue"
import ihead from "../home/components/head.vue"
import menuTree from '../../components/opentree.vue'
import api from "../../network/all_api/aip"
import {useStore} from "vuex"
const Store = useStore();
const setToken = ()=>{
const tokenStr = localStorage.getItem("token");
Store.commit("setToke",tokenStr);
}
setToken();
</script>