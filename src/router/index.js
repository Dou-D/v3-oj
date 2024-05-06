import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user"; // 引入用户状态管理
import storage from "@/services/storage";

const routes = [
  {
    path: "/",
    redirect: "/home",
    name: "home",
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
            path: "/user",
            name: "user",
            meta: {
              auth: true,
              roles: ["admin", "stu"],
            },
            component: () => import("@/views/user/index.vue"),
          },
          {
            path: "/problems",
            name: "problems",
            meta: {
              auth: true,
              roles: ["admin", "stu"],
            },
            component: () => import("@/views/problem/index.vue"),
          },
          {
            path: "/problem",
            name: "problem",
            meta: {
              auth: true,
              roles: ["admin", "stu"],
            },
            component: () => import("@/views/problem/problem.vue"),
          },
          {
            path: "/contest/:id?",
            name: "contest",
            meta: {
              auth: true,
              roles: ["admin", "stu"],
            },
            component: () => import("@/views/contest/contest.vue"),
          },
          {
            path: "/contest/detail/:id",
            name: "contestDetail",
            meta: {
              auth: true,
              roles: ["admin", "stu"],
            },
            component: () => import("@/views/contest/detail.vue"),
          }
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    meta: {
      auth: false,
    },
    component: () => import("@/views/user/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      auth: false,
    },
    component: () => import("@/views/user/register.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = storage.get(storage.USER_TOKEN);

  // 用户身份
  if (token && !userStore.identity || userStore.menu.length === 0) {
    await userStore.updateUserInfo();
  }
  // 权限路由
  if (token && !userStore.identity || !userStore.adminRoutesAdded) {
    userStore.addAdminRoutes(router); // 传递 router 实例
    return next(to.fullPath);
  }
  if (to.meta.auth) {
    if (token) {
      if (to.path === "/user/login") {
        return next("/");
      }
      if (to.meta.roles.includes(userStore.identity)) {
        return next();
      } else {
        return next("/404");
      }
    } else {
      return next("/user/login");
    }
  } else {
    // if (!to.redirectedFrom) {
    //   // 防addRoute造成空白or404
    //   return next({ ...to, replace: true })
    // }
    return next();
  }
});

export default router;
