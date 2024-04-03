import { createRouter, createWebHistory } from "vue-router";
import storage from "@/services/storage"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 404
    {
      path: '/:pathMatch(.*)', component: () => import("@/views/index.vue")
    },
    {
      path: "/",
      redirect: "/home",
      component: () => import("@/views/index.vue"),
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
