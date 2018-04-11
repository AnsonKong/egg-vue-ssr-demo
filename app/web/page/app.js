import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import { sync } from 'vuex-router-sync'
import createElementUI from './element'

export default () => {
	const router = createRouter()
	const store = createStore()
	createElementUI()
	// Sync vue-router's current $route as part of vuex store's state.
	sync(store, router)

	const app = new Vue({
		router,
		store,
		render: h => h(App),
	})

	return { app, router, store }
}