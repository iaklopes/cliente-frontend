import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import NProgress from 'nprogress';
import VueMask from 'vue-the-mask';
import App from './App.vue';
import auth from './store/LocalStorage';
import { BootstrapVue } from "bootstrap-vue";
import routes from './routes';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueMask);
Vue.config.productionTip = false;

const router = new VueRouter({ mode: 'history', routes: routes });

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
  if (to.meta.requireAuth) {
    const userAuth = {
        user: auth.user,
        perfil: auth.perfil
    };

    if ((to.meta.grantAll) || (to.meta.grants.includes(userAuth.perfil))) {

        console.log('Grant all: ' + to.meta.grantAll);
        console.log('Grants: ' + to.meta.grants);

        next();

    } else {

        if (!to.meta.grants.includes(userAuth.perfil)) {
            alert("Você não tem acesso a esse recurso"),
              next({ name: 'Login'})
            
        } else {
            next({ name: 'Login'});
        }
      }

    } else {
        next({ name: 'Login'});
    }
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')