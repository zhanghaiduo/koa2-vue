import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
// set ElementUI lang to EN
Vue.use(ElementUI)
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.filter('normalDate', function(value) {
  function padDate(va) {
    va = va < 10 ? '0' + va : va
    return va
  }
  var val = new Date(value)
  var year = val.getFullYear()
  var month = padDate(val.getMonth() + 1)
  var day = padDate(val.getDate())
  var hour = padDate(val.getHours())
  var minutes = padDate(val.getMinutes())
  var seconds = padDate(val.getSeconds())
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
