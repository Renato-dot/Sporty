const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/Oprema", component: () => import("src/pages/OpremaAPI.vue") },
      { path: "/Tereni", component: () => import("src/pages/TereniAPI.vue") },
      {
        path: "/Pretrazivanje",
        component: () => import("pages/PretrazivanjeAPI.vue"),
      },
      { path: "/Lokacije", component: () => import("pages/LokacijePage.vue") },
      { path: "/Prijava", component: () => import("pages/PrijavaPage.vue") },
      {
        path: "/Registracija",
        component: () => import("pages/RegistracijaPage.vue"),
      },
      {
        path: "/Rezervacije",
        component: () => import("pages/PregledSvihRezervacijaPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/admin/opremaAPI",
        component: () => import("pages/OpremaAPI.vue"),
      },
      {
        path: "/admin/tereniAPI",
        component: () => import("pages/TereniAPI.vue"),
      },
      {
        path: "/admin/dodavanje_terena",
        component: () => import("pages/DodavanjeTerena.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/admin/logout",
        component: () => import("pages/AdminLogout.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
