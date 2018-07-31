<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="!$store.getters['auth/isAuthenticated']" to="/login">Login</router-link>
      <template v-else>
        <router-link to="/restricted">Restricted</router-link> |
        <button @click="logout">Log Out</button>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script>
	export default {
		name: 'Restricted',
		data() {
			return {};
		},
		created() {
		},
		mounted() {
		},
		methods: {
			logout() {
				this.$store.dispatch('auth/AUTH_LOGOUT').then(() => {
					this.$router.push('/login/');
				});
			},
		},
	};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
