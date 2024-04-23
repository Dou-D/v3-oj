import { createRouter, createWebHistory } from "vue-router";
import storage from "@/services/storage";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
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
              meta: {
                auth: false,
                roles: ["admin", "guest"],
              },
              component: () => import("@/views/problem/problem.vue"),
            },
            // 用户
            // 后台管理
            {
              path: "/console",
              redirect: "/console/problems",
              meta: { auth: true, roles: ["admin"] },
              component: () => import("@/views/admin/index.vue"),
              children: [
                // 添加题目
                {
                  path: "/console/addproblem",
                  meta: { auth: true, roles: ["admin"] },
                  component: () => import("@/views/admin/addproblem.vue"),
                },
                {
                  path: "/console/problems",
                  meta: { auth: true, roles: ["admin"] },
                  component: () => import("@/views/admin/problems.vue"),
                },
                {
                  path: "/console/users",
                  meta: { auth: true, roles: ["admin"] },
                  component: () => import("@/views/admin/users.vue"),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/user",
      name: "user",
      meta: {
        auth: true,
      },
      component: () => import("@/views/user/index.vue"),
      children: [
        // {
        //   path: "/user/changepassword",
        //   name: "changepassword",
        //   component: () => import("@/views/user/changePassword.vue"),
        // },
        {
          path: "/user/login",
          name: "login",
          component: () => import("@/views/user/login.vue"),
        },
        {
          path: "/user/register",
          name: "register",
          component: () => import("@/views/user/register.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});
// router.beforeEach((to, from, next) => {
//   const token = storage.get("metc_user_token")
//   if (to.meta.auth && !token) {
//     next({ path: "/user/login" });
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  // 获取当前登录状态及用户角色
  const { identity } = storeToRefs(userStore);
  // 判断该路由是否需要登录权限
  if (to.meta.auth) {
    // 如果需要，则校验用户是否已经登录
    const token = storage.get("metc_user_token")
    if (token) {
      // 判断当前用户是否有访问该路由的权限
      if (to.meta.roles.includes(identity.value)) {
        next(); // 用户有访问权限，直接进入页面
      } else {
        next("/not"); // 跳转到其他页面
      }
    } else {
      // 如果用户未登录，则跳转到登录页面
      next("/login");
    }
  } else {
    next(); // 如果不需要登录权限，直接进入页面
  }
});

export default router;
