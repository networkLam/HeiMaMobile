import { createStore } from 'vuex'

export default createStore({
  state: {
    token : localStorage.getItem("token") ? localStorage.getItem("token") : '',
    count : 1
  },
  getters :{
      getState(state){
        if(!state.token){
          let temp_token  = localStorage.getItem("token") as string;
          state.token = JSON.parse(temp_token);
        }
        return state.token
      }
  },
  mutations: {
    // 通过mutation去改变state中的值
    setToke(state,token){
      // console.log(token)
      state.token = token;
      localStorage.setItem("token",token)
    },
    delToken(state){
      state.token = '';
      localStorage.removeItem("token");
    },
    addCount(state,testData){
      state.count++
      console.log(testData)
    }
  },
  actions: {
  },
  modules: {
  }
})
