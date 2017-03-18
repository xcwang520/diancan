import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)

NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login' && to.path != '/regist') {
    next({ path: '/login' })
  } else {
    next()
  }
})

//axios.defaults.withCredentials = true;
axios.interceptors.request.use(
    config => {
        NProgress.start();
        if(sessionStorage.getItem('token')) {
            config.headers.token = sessionStorage.getItem('token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(
    response => {
        NProgress.done();
        return response;
    },
    error => {
        NProgress.done();
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    sessionStorage.removeItem('user');
                    router.replace({
                        path: 'login'
                    })
                    break;
                default:
                    break;
            }
        }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
);

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  //components: { App }
  render: h => h(App)
}).$mount('#app')
