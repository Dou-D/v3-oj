import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfoAPI } from "@/services/user";
export const useUserStore = defineStore("user", () => {

  const menu = ref([]);
  const identity = ref("");
  const adminRoutesAdded = ref(false);
  const updateUserInfo = async () => {
    const res = await getUserInfoAPI();
    menu.value = res.data.data.menu
    identity.value = res.data.data.identity;

  };

  function addAdminRoutes(router) {
    if (!adminRoutesAdded.value) {
      router.addRoute("index", {
        path: "/console",
        redirect: "/console/problems",
        name: "console",
        meta: { auth: true, roles: ["admin"] },
        component: () => import("@/views/admin/index.vue"),
        children: [
          {
            path: "/console/problem",
            meta: { auth: true, roles: ["admin"] },
            component: () => import("@/views/admin/problems.vue"),
          },
          {
            path: "/console/addproblem",
            meta: { auth: true, roles: ["admin"] },
            component: () => import("@/views/admin/addproblem.vue"),
          },
          {
            path: "/console/users",
            meta: { auth: true, roles: ["admin"] },
            component: () => import("@/views/admin/users.vue"),
          },
        ],
      });
      adminRoutesAdded.value = true;
    }
  }

  return {
    menu,
    identity,
    adminRoutesAdded,
    updateUserInfo,
    addAdminRoutes,
  };
});
