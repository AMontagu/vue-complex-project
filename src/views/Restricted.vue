<template>
	<div id="restricted">
		<h1>Access Restricted</h1>

		<p>Welcome {{ $store.getters['auth/username'] }}</p>
	</div>
</template>

<script>
	export default {
		name: 'Restricted',
	};
</script>

<style lang="scss" scoped>
</style>