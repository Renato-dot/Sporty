const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/Oprema', component: () => import('src/pages/OpremaPage.vue') },
      { path: '/Pretrazivanje', component: () => import('pages/PretrazivanjePage.vue') },
      { path: '/ONama', component: () => import('pages/ONamaPage.vue') },
      { path: '/Lokacije', component: () => import('pages/LokacijePage.vue') },
      { path: '/Prijava', component: () => import('pages/PrijavaPage.vue') },
      { path: '/Registracija', component: () => import('pages/RegistracijaPage.vue') }

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
