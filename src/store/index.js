import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const state = {
  UserList:{},
  sidebar: {
    opened: window.sessionStorage.getItem('sidebarStatus') ? !!+window.sessionStorage.getItem('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  fixedHeader: false
}

const getters = {
  sidebar: state => state.sidebar,
  device: state => state.device
}

const mutations = {
  setUserList (state, data) {
    state.UserList = data;
  },
  toggleSideBar: state => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      window.sessionStorage.setItem({key:"sidebarStatus",data:1});
    } else {
      window.sessionStorage.setItem({key:"sidebarStatus",data:0});
    }
  },
  closeSideBar: (state, withoutAnimation) => {
    window.sessionStorage.setItem({key:"sidebarStatus",data:0});
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  toggleDevice: (state, device) => {
    state.device = device;
  },
}
const store = new Vuex.Store({
  state, // 共同维护的一个状态，state里面可以是很多个全局状态
  getters,
  mutations,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})
export default store // 导出store并在 main.js中引用注册
