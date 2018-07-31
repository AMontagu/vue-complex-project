<template>
	<div class="home">


		<button @click="showHeavyImage = !showHeavyImage">Show/hide Heavy Image</button>
		<heavy-image v-show="showHeavyImage"></heavy-image>

		<!-- Code splitting not usefull when using v-if-->
		<!--heavy-image v-if="showHeavyImage"></heavy-image-->

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

	//Difference between code splitting and import normal -> when the heavy image is loaded
	const HeavyImage = () => import ('@/components/HeavyImage.vue')
	//import HeavyImage from '@/components/HeavyImage.vue'

	export default {
		name: 'home',
		components: {
			HelloWorld,
			HeavyImage
		},
		data() {
			return {
				langs: ['en', 'fr'],
				showHeavyImage: false
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
