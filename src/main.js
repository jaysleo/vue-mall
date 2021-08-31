import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import '@/utils/tools'
import './assets/fonts/iconfont.css'
import TreeTable from 'vue-table-with-tree-grid'
import Axios from 'axios'
import '@/assets/css/trantion.css'

// require styles
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.component('tree-table', TreeTable)

Vue.config.productionTip = false;
// 将axios挂载到原型上
Vue.prototype.$axios = Axios

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
