import axios from 'axios';
import VueCookie from 'vue-cookie';

const state = {
	username: VueCookie.get('username') || sessionStorage.getItem('username') || '',
	token: VueCookie.get('token') || sessionStorage.getItem('token') || '',
	status: '',
};

const getters = {
	isAuthenticated: state => !!state.token,
	username: state => state.username,
	token: state => state.token,
};

const actions = {
	// eslint-disable-next-line
	AUTH_REQUEST({commit, dispatch}, userCredentials) {
		return new Promise((resolve, reject) => {
			// The Promise used for router redirect in login
			commit('AUTH_REQUEST');
			axios
				.post('/api/auth/login', userCredentials)
				.then(response => {
					/*localStorage.setItem('token', response.data.token)
				localStorage.setItem('username', response.data.username)
				localStorage.setItem('permission', response.data.permission)*/

					if (userCredentials.remember) {
						VueCookie.set('token', response.data.token, 30);
						VueCookie.set('username', response.data.username, 30);
					} else {
						sessionStorage.setItem('token', response.data.token);
						sessionStorage.setItem('username', response.data.username);
					}

					axios.defaults.headers.common['x-access-token'] = response.data.token;

					commit('AUTH_SUCCESS', response.data);

					resolve(response);
				})
				.catch(err => {
					commit('AUTH_ERROR', err);
					/*localStorage.removeItem('token')
				localStorage.removeItem('username')
				localStorage.removeItem('permission')*/

					VueCookie.delete('token');
					VueCookie.delete('username');
					VueCookie.delete('permission');

					if ('x-access-token' in axios.defaults.headers.common) {
						delete axios.defaults.headers.common['x-access-token'];
					}

					sessionStorage.clear();

					reject(err);
				});
		});
	},

	// eslint-disable-next-line
	async AUTH_LOGOUT({commit, dispatch}) {

		await axios.get('/api/auth/logout')
		commit('AUTH_LOGOUT');
		/*localStorage.removeItem('token')
		localStorage.removeItem('username')
		localStorage.removeItem('permission')*/

		VueCookie.delete('token');
		VueCookie.delete('username');
		VueCookie.delete('permission');
		sessionStorage.clear();

		delete axios.defaults.headers.common['x-access-token'];
	},
};

const mutations = {
	AUTH_REQUEST(state) {
		state.status = 'loading';
	},
	AUTH_SUCCESS(state, data) {
		state.status = 'success';
		state.token = data.token;
		state.username = data.username;
	},
	AUTH_LOGOUT(state) {
		state.status = '';
		state.token = '';
		state.username = '';
	},
	AUTH_ERROR(state) {
		state.status = 'error';
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
