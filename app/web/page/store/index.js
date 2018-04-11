import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
	return new Vuex.Store({
		state: () => {
			logined: false
		},
		mutations: {
			setLogined (state, value) {
				state.logined = value;
			}
		}
	})
}