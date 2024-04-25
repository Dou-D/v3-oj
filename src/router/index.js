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
      component: () => import("@/views/home/main.vue"),
      children: [
        // 首页
        {
          path: "/home",
          name: "index",
          component: () => import("@/views/home/index.vue"),
          children: [
            {
              path: "/home",
              name: "our",
              component: () => import("@/views/home/our.vue"),
            },
            {
              path: "/problems",
              name: "problems",
              component: () => import("@/views/problem/index.vue"),
            },
            {
              path: "/problem",
              name: "problem",
              meta: {
                auth: true,
                roles: ["admin", "guest"],
              },
              component: () => import("@/views/problem/problem.vue"),
            },
            // 用户
          ],
        },
      ],
    },
    {
      path: "/user",
      name: "user",
      meta: {
        auth: true,
        roles: ["admin", "guest"],
      },
      component: () => import("@/views/user/index.vue"),
      children: [
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

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  // 获取当前登录状态及用户角色
  const { identity, menu } = storeToRefs(userStore);
  if (!identity || !menu) {
    await userStore.updateUserInfo();
  }
  // 判断用户是否为管理员
  if (identity.value === "admin" && !router.hasRoute("console")) {
    router.addRoute("index", {
      path: "/console",
      redirect: "/console/problems",
      name: "console",
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
    });
    // if (to.path.startsWith('/console')) {
    //   next({ ...to, replace: true });
    //   return;
    // }
  }
  // 判断该路由是否需要登录权限
  if (to.meta.auth) {
    // 如果需要，则校验用户是否已经登录
    const token = storage.get(storage.USER_TOKEN);
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
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();
//   const { identity } = storeToRefs(userStore);
//   if (to.meta.auth) {
//     const token = storage.get("metc_user_token")
//     if (token) {
//       if (to.meta.roles.includes(identity.value))
//         next()
//       else
//         next('/404')
//     } else
//       next('/user/login')
//   } else next()
// })
export default router;
