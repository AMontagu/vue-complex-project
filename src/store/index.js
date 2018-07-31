import Vue from 'vue';
import Vuex from 'vuex';
import modules from './moduleRegistration';

Vue.use(Vuex);

// eslint-disable-next-line
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	strict: debug,
	modules,
});
