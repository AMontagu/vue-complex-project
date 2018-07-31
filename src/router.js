import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

const Home = () => import(/* webpackChunkName: "home" */'./views/Home.vue');
const About = () => import(/* webpackChunkName: "about" */ './views/About.vue');
const Login = () => import(/* webpackChunkName: "login" */ './views/Login.vue');
const Restricted = () => import(/* webpackChunkName: "login" */ './views/Restricted.vue');

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
	if (!store.getters['auth/isAuthenticated']) {
		next();
		return;
	}
	next('/');
};

const ifAuthenticated = (to, from, next) => {
	if (store.getters['auth/isAuthenticated']) {
		next();
		return;
	}
	next('/login');
};

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			component: About
		},
		{
			path: '/restricted',
			name: 'restricted',
			component: Restricted,
			beforeEnter: ifAuthenticated
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			beforeEnter: ifNotAuthenticated
		}
	]
})
