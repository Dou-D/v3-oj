import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getUserInfoAPI } from "@/services/user";

export const useUserStore = defineStore("user", () => {
  const menu = ref([])
  menu.value.push({
    id: 1,
    title: "题目管理",
    path: "/console/problem"
  },
  {
    id: 2,
    title: "用户管理",
    path: "/console/user"
  },
  {
    id: 3,
    title: "添加题目",
    path: "/console/addproblem"
  })
  const identity = ref('admin')
  // 更新用户、菜单信息
  async function updateUserInfo() {
    const res = await getUserInfoAPI()
      if(res.data.code !== 200) {
        throw new Error(res.data.message)
      }
      menu.value.push(...res.data.data.menu)
      identity.value = res.data.data.identity
  }
  return {
    menu,
    identity,
    updateUserInfo
  }
});
