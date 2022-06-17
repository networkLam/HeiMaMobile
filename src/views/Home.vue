<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
interface MyInfomation{
  name : string,
  age : number,
  address :string[]
}
export default defineComponent({
  name: 'Home',
  setup(){
    const test = ref<MyInfomation>({
      name : "",
      age : 12,
      address :['']
    })
  },
  components: {
    HelloWorld,
  },
});
</script>
