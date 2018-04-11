import createApp from './app'

const { app, router, store } = createApp()

// inject store.state with server init data like `logined: Boolean`
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
	// if 'client-data-pre-fetching' is needed
  // use `router.befoeResolve((to, from, next) => { ... })`
  // use Promise & remember to run `next()`
  app.$mount('#app')
})