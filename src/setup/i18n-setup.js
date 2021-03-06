//i18n-setup.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/lang';
import axios from 'axios';

Vue.use(VueI18n);

export const i18n = new VueI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
});

const loadedLanguages = ['en']; // our default language that is prelaoded

function setI18nLanguage(lang) {
	i18n.locale = lang;
	axios.defaults.headers.common['Accept-Language'] = lang;
	document.documentElement.lang = lang;
	return lang;
}

export function loadLanguageAsync(lang) {
	if (typeof lang === 'undefined' || lang === null) {
		lang = 'en';
	}
	if (i18n.locale !== lang) {
		if (!loadedLanguages.includes(lang)) {
			return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(
				msgs => {
					i18n.setLocaleMessage(lang, msgs.default);
					loadedLanguages.push(lang);
					return setI18nLanguage(lang);
				}
			);
		}
		return Promise.resolve(setI18nLanguage(lang));
	}
	return Promise.resolve(lang);
}
