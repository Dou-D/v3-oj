import { createRouter, createWebHistory } from "vue-router";
import storage from "@/services/storage"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/views/main.vue"),
      children: [
        {
          path: "/home",
          name: "index",
          component: () => import("@/views/index.vue"),
          children: [
            {
              path: "/problems",
              name: "problems",
              component: () => import("@/views/problem/index.vue"),
            },
            {
              path: "/problem",
              name: "problem",
              component: () => import("@/views/problem/problem.vue"),
            },
          ]
        },
        {
          path: "/user",
          name: "user",
          component: () => import("@/views/user/index.vue"),
        },
        {
          path: '/changepassword',
          name: 'changepassword',
          component: () => import('@/views/user/changePassword.vue')
        },
        {
          path: "/login",
          name: "login",
          component: () => import("@/views/user/login.vue"),
        }
      ]
    },

  ],
});
// router.beforeEach((to, from, next) => {
//     const token = storage.get("metc_user_token")
//     if (to.meta.auth && !token) {
//         next({path: "/admin"});
//     } else {
//         next();
//     }
// });
export default router;
