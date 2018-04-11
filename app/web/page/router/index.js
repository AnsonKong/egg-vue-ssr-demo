import Vue from 'vue'
import Router from 'vue-router'

const routes = [
	{ path: '/', component: () => import('../components/home/Home.vue') },
	{ path: '/about', component: () => import('../components/about/About.vue')  },
]

Vue.use(Router)

export default () => {
	return new Router({
		mode: 'history',
		routes
	})
}