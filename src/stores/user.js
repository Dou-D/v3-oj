import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfoAPI } from "@/services/user";
import { useRouter } from 'vue-router'


export const useUserStore = defineStore("user", () => {
  const menu = ref([]);
  menu.value.push({
    id: 1,
    title: "题目管理",
    path: "/console/problems"
  },
  {
    id: 2,
    title: "用户管理",
    path: "/console/users"
  },
  {
    id: 3,
    title: "添加题目",
    path: "/console/addproblem"
  })
  const identity = ref("admin");
  const adminRoutesAdded = ref(false);
  async function updateUserInfo() {
    try {
      const res = await getUserInfoAPI();
      if (res.data.code !== 200) {
        throw new Error(res.data.msg);
      }
      menu.value = res.data.data.menu;
      identity.value = res.data.data.identity;
    } catch (error) {
      throw new Error(error.message)
    }
  }
  const router = useRouter()

  function addAdminRoutes() {
    if (!adminRoutesAdded.value) {
      router.addRoute("index",{
        path: "/console",
        redirect: "/console/problems",
        name: "console",
        meta: { auth: true, roles: ["admin"] },
        component: () => import("@/views/admin/index.vue"),
        children: [
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
