const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/PregledTerenaOpreme ', component: () => import('pages/PregledTerenaOpremePage.vue') },
      { path: '/Pretrazivanje ', component: () => import('pages/PretrazivanjePage.vue') },
      { path: '/ONama ', component: () => import('pages/ONamaPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
