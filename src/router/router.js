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
        // 首页
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
        // 用户
        {
          path: "/user",
          name: "user",
          component: () => import("@/views/user/index.vue"),
          children: [
            {
              path: '/user/changepassword',
              name: 'changepassword',
              component: () => import('@/views/user/changePassword.vue')
            },
            {
              path: "/user/login",
              name: "login",
              component: () => import("@/views/user/login.vue"),
            },
            {
              path: "/user/register",
              name: "register",
              component: () => import("@/views/user/register.vue"),
            }
          ]
        },
      ]
    },
    // 后台管理
    {
      path: "/console",
      name: "console",
      component: () => import("@/views/admin/index.vue"),
      children: [
        {
          path: "/console/addproblem",
          name: "problem",
          component: () => import("@/views/admin/addproblem.vue"),
        }
      ]
    }
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
