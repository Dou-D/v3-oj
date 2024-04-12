import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const menu = [
    {
      "id": 1,
      "title": "个人中心",
      "path": "problem"
    },
    {
      "id": 2,
      "title": "退出",
      "path": "problem"
    }
  ];

  return {
    menu,
  }
});
