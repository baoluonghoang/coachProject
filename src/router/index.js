import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [
  { path: "/", redirect: "/coaches" },
  {
    path: "/coaches",
    name: "CoachList",
    component: () =>
      import(
        /* webpackChunkName: "CoachList" */ "../views/coaches/CoachList.vue"
      ),
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
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "CoachRegister" */ "../views/coaches/CoachRegister.vue"
      ),
    meta: { authRequired: true },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "Auth" */ "../views/auth/Auth.vue"),
    meta: { unAuthRequired: true },
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
    path: "/:NotFound(.*)*",
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
  if (to.meta.authRequired && !store.getters["auth/isLogin"]) {
    next("/auth");
  } else if (to.meta.unAuthRequired && store.getters["auth/isLogin"]) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
