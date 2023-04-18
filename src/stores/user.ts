import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    isLoggedIn: false,
    avatar:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    id: 0,
    uname: "未登录",
  }),

  actions: {
    setUser(avatar, id, uname, isLoggedIn) {
      this.avatar = `http://localhost:3000/avatar/${avatar}`;
      this.id = id;
      this.uname = uname;
      this.isLoggedIn = isLoggedIn;
    },
    logout() {
      location.reload();
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      ElMessage({
        message: "请重新登陆吧~",
      });
      localStorage.removeItem("user");
      // 重置用户信息
      this.avatar =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
      this.id = "";
      this.uname = "未登录";

      // 更新登录状态
      this.isLoggedIn = false;
    },
  },
});
