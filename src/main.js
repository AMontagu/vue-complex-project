import Vue from 'vue'
import VueCookie from 'vue-cookie';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { i18n, loadLanguageAsync } from '@/setup/i18n-setup';
import ComponentRegistration from '@/setup/componentRegistration'
import axios from 'axios';

ComponentRegistration();

Vue.config.productionTip = false

Vue.use(VueCookie);

const token = Vue.cookie.get('token') || sessionStorage.getItem('token');
if (token) {
	axios.defaults.headers.common['x-access-token'] = token;
}

axios.interceptors.request.use(
	config => {
		let csrfToken = Vue.cookie.get('CSRF-TOKEN');
		if (typeof csrfToken !== 'undefined' && csrfToken !== null) {
			config.headers['csrf-token'] = csrfToken;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

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
