import { ref, computed } from "vue";
import { defineStore } from "pinia";
import storage from "@/services/storage";
export const useUserStore = defineStore("user", () => {
  // 角色

  const identity = ref(storage.get("identity"))

  // 权限
  const userPermissions = ref(storage.get('menu'))

  return {
    identity,
    userPermissions,
  }
});
