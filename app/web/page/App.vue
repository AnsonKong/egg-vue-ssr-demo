<template>
	<el-container>
		<el-header>
			<NavMenu :logined="logined"/>
		</el-header>
		<el-main>
			<router-view/>
		</el-main>
		<el-footer>

		</el-footer>
	</el-container>
</template>

<script>
import NavMenu from './components/NavMenu.vue';

export default {
	name: 'App',
	computed: {
		logined: function () {
			return this.$store.state.logined
		}
	},
	components: {
		NavMenu
	}
}
</script>

<style>
body {
	margin: 0
}
</style>

<style lang="stylus" scoped>
.el-header
	padding 0
</style>

<style src="element-ui/lib/theme-chalk/index.css"></style>