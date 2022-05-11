import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入地图组件
import AMap from "vue-amap"
Vue.use(AMap)

// 引入标签云组件
import tagCloud from 'v-tag-cloud'
Vue.use(tagCloud)

// 事件车
Vue.prototype.event=new Vue();

// 初始化 AMap
AMap.initAMapApiLoader({
  // key 值
  key: "26d138d09a69be3ced2246f71853237b",
  // 插件
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})




// 引入 iconfont
import "@/assets/iconfont/iconfont.css"

// 引入全局 element 组件
import '@/js/element.js'

// 引入 markdown 文件,以及相关样式
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
