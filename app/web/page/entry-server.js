import createApp from './app'

export default ssrContext => {
	return new Promise((resolve, reject) => {
		const { app, router, store } = createApp()
		// set currentRoute & load async component
		router.push(ssrContext.url)
		// listen router.onReady
		router.onReady(() => {
			// if any components matched
      let matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // init server store
      if (ssrContext.hasOwnProperty('logined')) {
      	store.commit('setLogined', ssrContext.logined)
      }
      // if 'server-data-pre-fetching' is needed, remember to use Promise & resolve(app)
      // ...
      ssrContext.state = store.state
      resolve(app)
    }, reject)
	})
}