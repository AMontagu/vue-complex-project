function getLocalStorageValue(key, type){
	let value = localStorage.getItem(key);
	if(type === 'boolean'){
		return value === 'true';
	}
	if(type === 'object'){
		return JSON.parse(value);
	}
	if (type === 'number'){
		return parseInt(value)
	}
	return value;
}

const state = {
	showHeavyImage: null,
};

const getters = {
	showHeavyImage: state => {
		if (state.showHeavyImage === null) {
			return getLocalStorageValue('showHeavyImage', 'boolean');
		} else {
			return state.showHeavyImage;
		}
	},
};

const actions = {};

const mutations = {
	invertShowHeavyImage(state) {
		if (state.showHeavyImage === null) {
			state.showHeavyImage = getLocalStorageValue('showHeavyImage', 'boolean');
		}
		state.showHeavyImage = !state.showHeavyImage;
		localStorage.setItem('showHeavyImage', state.showHeavyImage);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
