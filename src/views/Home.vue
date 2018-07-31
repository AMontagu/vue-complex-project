<template>
	<div class="home">
		<img
			v-for="lang in langs"
			:key="lang"
			:src="`/img/flag/${lang}.png`"
			style="max-height: 40px; max-width: 40px;"
			@click="changeLang(lang)"
		>
		<img src="../assets/logo.png">
		<HelloWorld :msg="$t('Home.WelcomeMessage')"/>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'

	export default {
		name: 'home',
		components: {
			HelloWorld
		},
		data() {
			return {
				langs: ['en', 'fr'],
			};
		},
		methods: {
			changeLang(lang) {
				this.$cookie.set('lang', lang, 30);
				this.$i18n.locale = lang;
			},
		}
	}
</script>
