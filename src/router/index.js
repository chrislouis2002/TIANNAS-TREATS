import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { auth, authReady } from 'src/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'


const ADMIN_EMAIL = 'tiannastreats.gifts@gmail.com'


function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to) => {
    if (!to.matched.some(record => record.meta.requiresAuth)) {
      return true
    }


    try {
      await authReady
      const user = await getCurrentUser()


      if (!user) {
        return { name: 'login', query: { redirect: to.fullPath } }
      }


      if (user.email?.toLowerCase() !== ADMIN_EMAIL) {
        await signOut(auth)
        return { name: 'login' }
      }


      return true
    } catch (error) {
      console.error('Admin authentication check failed:', error)
      return { name: 'login' }
    }
  })


  return Router
})
