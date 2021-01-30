import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  { path: "/", redirect: "/coaches" },
  {
    path: "/coaches",
    name: "Coaches",
    component: () =>
      import(/* webpackChunkName: "Coaches" */ "../views/coaches/Coaches.vue"),
  },
  {
    path: "/coaches/:id",
    name: "CoachDetail",
    component: () =>
      import(
        /* webpackChunkName: "CoachDetail" */ "../views/coaches/CoachDetail.vue"
      ),
    props: true,
    children: [
      {
        path: "contact",
        name: "CoachContact",
        component: () =>
          import(
            /* webpackChunkName: "CoachContact" */ "../views/requests/CoachContact.vue"
          ),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "CoachCreate" */ "../views/auth/CoachCreate.vue"
      ),
    meta: { authRequired: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/auth/Login.vue"),
  },
  {
    path: "/requests",
    name: "Requests",
    component: () =>
      import(
        /* webpackChunkName: "CoachRequestsReceived" */ "../views/requests/CoachRequestsReceived.vue"
      ),
  },

  {
    path: "/:notFound(.*)",
    name: "PageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "PageNotFound" */ "../components/layouts/PageNotFound.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//guard navigation
router.beforeEach((to, _, next) => {
  // if (to.matched.some((record) => record.meta.authRequired)) {
  //   if (!store.state.user) {
  //     next({
  //       name: "Login",
  //       query: { redirect: to.fullPath },
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
  if (to.meta.authRequired && !store.state.user) {
    next("/login");
  } else if (to.meta.authRequired && store.state.user) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
