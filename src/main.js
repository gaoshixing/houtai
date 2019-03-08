import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue'; 
import iView from 'iview';
import Routers ,{ config } from './router.js';
import store from './store/index.js';
import "./libs/polyfill.js";
import './assets/less/public.less';
import './assets/less/theme.less';
import VueI18n from 'vue-i18n';
import Cookies from "js-cookie";
import Locales from './locales';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

const isDebug = process.env.NODE_ENV !== 'production';
let isShowConfirm = false
Vue.config.debug = isDebug;
Vue.config.devtools = isDebug;
Vue.config.productionTip = isDebug;
Vue.use(VueI18n);
const messages = {
    en: Object.assign(Locales.en, enLocale),
    zh: Object.assign(Locales.zh, zhLocale)
};
const i18n = new VueI18n({
    locale: Cookies.get('lang'),
    fallbackLocale: config.fallbackLocale,
    messages
});
Vue.use(VueRouter);
Vue.use(iView, { // https://github.com/iview/iview/issues/1090
    i18n: function(path, options) {
        let value = i18n.t(path, options);
        if (value !== null && value !== undefined) return value;
        return '';
    }
});

// 路由配置
const RouterConfig = {
    routes: Routers,
    mode:'hash'
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    if(to.fullPath != "/login.html" && to.fullPath != "/app.html" ) {
        let localRoleId = localStorage.getItem('roleId')
        let id = store.state.userInfo.roleId
        if(localRoleId !== id&&id) {
            store.state.userInfo.roleId = ''
            isShowConfirm = true
            alert('浏览器已经登录其他账户,请重新登录')
            // confirm('浏览器已经登录其他账户,请重新登录')
            next({
                name: 'portal.login'
            });
            return 
        }else {
            next()
            return 
        }
    }
    // let arr, cook,reg=new RegExp("(^| )"+'spoc.session.id'+"=([^;]*)(;|$)");
    // if(arr=document.cookie.match(reg)) {
    //     cook = arr[2]
    // }
    // let cook2 = localStorage.getItem('access_token')
    // if(cook !== cook2 && !from.meta.requireAuth) {
    //     next({
    //         name: 'portal.login'
    //     });
    //     return
    // }

    if(to.fullPath == "/login.html") {
        let id = store.state.userInfo.roleId
        if (id) {
            next({
                name: 'portal.app'
            });
            return
        }
    } else {
        next();
    }
    next()
})


store.registerModule('config',{
    state:{
        ...config
    }
})
    
window.WebSiteApp=new Vue({
    i18n,
    el: '#app',
    store,
    router: router,
    render: h => h(App)
});