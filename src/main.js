import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { i18n, loadLanguageAsync } from '@/setup/i18n-setup';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	const lang = navigator.language || navigator.userLanguage;

	loadLanguageAsync(lang).then(() => next());
});

new Vue({
  router,
  store,
	i18n,
  render: h => h(App)
}).$mount('#app')
