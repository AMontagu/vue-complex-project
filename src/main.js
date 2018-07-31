import Vue from 'vue'
import VueCookie from 'vue-cookie';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { i18n, loadLanguageAsync } from '@/setup/i18n-setup';
import ComponentRegistration from '@/setup/componentRegistration'

ComponentRegistration();

Vue.config.productionTip = false

Vue.use(VueCookie);

router.beforeEach((to, from, next) => {
	//Can use localstorage if prefered
	let lang = Vue.cookie.get('lang') || navigator.language || navigator.userLanguage;

	loadLanguageAsync(lang).then(() => next());
});

new Vue({
  router,
  store,
	i18n,
  render: h => h(App)
}).$mount('#app')
