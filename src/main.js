/*
 * @Author: your name
 * @Date: 2019-10-23 23:20:00
 * @LastEditTime: 2019-11-14 23:21:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /cms/src/main.js
 */
import Vue from 'vue'
import Vuelidate from 'vuelidate'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import moment from 'moment'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
if (process.env.NODE_ENV === 'development') {
  // require('../mock')
}
// import '../mock' // simulation data

Vue.use(ElementUI, { locale })
Vue.use(Vuelidate)

Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
