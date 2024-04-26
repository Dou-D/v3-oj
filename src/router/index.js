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
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  // if (!userStore.identity || !userStore.menu.length) {
  //   await userStore.updateUserInfo();
  // }
  // if (userStore.identity === "admin" && !userStore.adminRoutesAdded) {
    userStore.addAdminRoutes(); // 传递 router 实例
  // }
  if (to.meta.auth) {
    const token = storage.get(storage.USER_TOKEN);
    if (token) {
      if(to.path === '/user/login') {
        next('/')
      }
      if (to.meta.roles.includes(userStore.identity)) {
        next();
      } else {
        next("/404");
      }
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
