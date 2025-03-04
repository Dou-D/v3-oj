import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getUserInfoAPI } from "@/services/user";
import { useRouter } from "vue-router";
import storage from "@/services/storage";
export const useUserStore = defineStore("user", () => {

  const menu = ref([]);
  const identity = ref("");
  const adminRoutesAdded = ref(false);
  let userInfo = reactive({
    username: "",
    startTime: '',
    submit: '',
    Accept: ""
  })
  const students = ref([])
  const router = useRouter()
  const updateUserInfo = async () => {
    const res = await getUserInfoAPI();
    menu.value = res.data.data.menu || []
    menu.value = menu.value.filter(item => item.id != 4);
    console.log();
    identity.value = res.data.data.identity;
    userInfo.username = res.data.data.info.username
    userInfo.startTime = res.data.data.info.startTime
    userInfo.submit = res.data.data.info.submit
    userInfo.Accept = res.data.data.info.Accept
    students.value = res.data.data.students
  };

  function addAdminRoutes() {
    // if(!storage.get(storage.USER_TOKEN)){
    //   router.replace("/login")
    //   return
    // }
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

  const deleteInfo = () => {
    menu.value = []
    identity.value = ''
    addAdminRoutes.value = false
    userInfo = reactive({
      username: "",
      startTime: '',
      submit: '',
      Accept: ""
    })
    students.value = []
  }
  return {
    menu,
    identity,
    userInfo,
    students,
    adminRoutesAdded,
    updateUserInfo,
    addAdminRoutes,
    deleteInfo
  };
});
