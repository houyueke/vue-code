import Vue from 'vue'
import App from './App.vue'
import router from './hrouter/index'
// import store from './store'
import store from './hstore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
