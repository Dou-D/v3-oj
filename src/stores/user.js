import { ref, computed } from "vue";
import { defineStore } from "pinia";
import storage from "@/services/storage";
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
  return {
    menu
  }
});
