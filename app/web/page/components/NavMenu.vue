<template>
	<el-menu :default-active="activeIndex"
	  mode="horizontal"
	  :router="true"
	  @select="onMenuSelected">
		  <el-menu-item index="/">首页</el-menu-item>

			<el-menu-item v-if="logined" class="menu-item-right" index="/logout">退出</el-menu-item>
			<el-menu-item v-else class="menu-item-right" index="/login">登录</el-menu-item>

			<el-menu-item class="menu-item-right" index="/about">关于</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	name: 'NavMenu',
	computed: {
		activeIndex () {
			return this.$route.path
		}
	},
	props: {
		logined: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		onMenuSelected (index) {
			switch (index) {
				case '/login':
					window.location.href = '/passport/github'
					break;
				case '/logout':
					window.location.href = '/logout'
					break;
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.menu-item-right
	float right
</style>