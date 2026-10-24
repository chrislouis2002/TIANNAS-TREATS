const routes = [
  {
    path: '/',
    component: () => import('pages/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/HomePage.vue') },
      { path: 'menu', name: 'menu', component: () => import('pages/IndexPage.vue') },
      { path: 'about', name: 'about', component: () => import('pages/AboutUs.vue') },
      { path: 'events', name: 'events', component: () => import('pages/EventsPage.vue') },
      { path: 'product/:id', name: 'product', component: () => import('pages/ProductPage.vue') },

      { path: 'find', name: 'find', component: () => import('pages/FindUs.vue') },

      // ✅ Checkout should hide background + footer
      { path: 'checkout', name: 'checkout', component: () => import('pages/CheckoutPage.vue'), meta: { hideFooter: true, noBackground: true } },

      // ✅ Admin should hide background + footer
      { path: 'admin', name: 'admin', component: () => import('pages/AdminPage.vue'), meta: { requiresAuth: true, hideFooter: true, noBackground: true } },

      // ✅ Login should hide background + footer
      { path: 'login', name: 'login', component: () => import('pages/LoginPage.vue'), meta: { hideFooter: true, noBackground: true } },
    ]
  },

  // ✅ Move order-success OUTSIDE the MainLayout
  {
    path: '/order-success',
    name: 'order-success',
    component: () => import('pages/OrderSuccess.vue'),
    meta: { hideFooter: true, noBackground: true },
  },

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes





