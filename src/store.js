import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//多组件所共用的公共存储仓库，底层原理是sessionStorage
export default new Vuex.Store({
  // 公共数据读取方法：this.$store.state.adminName
  // 公共数据读取方法：this.$store.state.globalSettings
  state: {//当前数据的状态，类似于组件对象的data属性
    adminName:'',//当前登录的管理员名
    globalSettings:{
      apiUrl:'http://127.0.0.1:8090' //初始默认值
    }
  },
  //公共数据的修改方法：this.$store.commit("setAdminName",'boss')
  //公共数据的修改方法：this.$store.commit("setGlobalSettings",{...})
  mutations: {//控制数据的进化(即修改state),类似于组件对象中的methods--用mutations修改可以保证数据的"响应式"
    setAdminName(state,value){
      state.adminName = value;
    },
    setGlobalSettings(state,value){
      state.globalSettings = value;
    }
  },
  actions: {

  }
})
