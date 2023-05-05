import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user";
import { checkToken } from "@/api/checkToken";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/MainPage.vue"),
    },
    {
      path: "/playlist",
      name: "playlist",
      component: () => import("../views/LikeLatePage.vue"),
    },
    {
      path: "/reply",
      name: "reply",
      component: () => import("../views/ReplyPage/ReplyPage.vue"),
      children: [
        {
          path: "like",
          name: "replyLike",
          component: () => import("../views/ReplyPage/ReplyLikePage.vue"),
        },
        {
          path: "comment",
          name: "replyComment",
          component: () => import("../views/ReplyPage/ReplyCommentPage.vue"),
        },
        {
          path: "system",
          name: "replySystem",
          component: () => import("../views/ReplyPage/ReplySystemPage.vue"),
        },
      ],
    },
    {
      path: "/video",
      name: "video",
      component: () => import("../views/VideoPage.vue"),
    },
    {
      path: "/manage/:id",
      name: "manage",
      component: () => import("../views/UserManagePage/UserManagePage.vue"),
      children: [
        {
          path: "main",
          name: "manageMain",
          component: () => import("../views/UserManagePage/UserManageMain.vue"),
        },
        {
          path: "video",
          name: "manageVideo",
          component: () =>
            import("../views/UserManagePage/UserManageVideo.vue"),
        },
        {
          path: "upload",
          name: "manageUpload",
          component: () =>
            import("../views/UserManagePage/UserManageUpload.vue"),
        },
        {
          path: "comment",
          name: "manageComment",
          component: () =>
            import("../views/UserManagePage/UserManageComment.vue"),
        },
      ],
    },
    {
      path: "/active",
      name: "active",
      component: () => import("../views/ActivePage.vue"),
    },
    {
      path: "/report",
      name: "report",
      component: () => import("../views/ReportPage.vue"),
    },
    {
      path: "/v/:query",
      name: "v",
      component: () => import("../views/VideoPartPage.vue"),
    },
    {
      path: "/search/:keyword",
      name: "search",
      component: () => import("../views/SearchPage/SearchPage.vue"),
      children: [
        {
          path: "video",
          name: "searchVideo",
          component: () => import("../views/SearchPage/SearchVideo.vue"),
        },
        {
          path: "user",
          name: "searchUser",
          component: () => import("../views/SearchPage/SearchUser.vue"),
        },
      ],
    },
    {
      path: "/usersearch/:id/:keyword",
      name: "usersearch",
      component: () => import("../views/UserSearchPage/UserSearchPage.vue"),
      children: [
        {
          path: "user",
          name: "userSearch",
          component: () => import("../views/UserSearchPage/UserSearch.vue"),
        },
        {
          path: "active",
          name: "userAActive",
          component: () => import("../views/UserSearchPage/ActiveSearch.vue"),
        },
      ],
    },
    {
      path: "/user/:id",
      component: () => import("../views/UserPage/UserPage.vue"),
      children: [
        {
          path: "video",
          name: "userVideo",
          component: () => import("../views/UserPage/UserVideoPage.vue"),
        },
        {
          path: "setting",
          name: "userSetting",
          component: () => import("../views/UserPage/UserSettingPage.vue"),
        },
        {
          path: "main",
          name: "userMain",
          component: () => import("../views/UserPage/UserMainPage.vue"),
        },
        {
          path: "collect",
          name: "userCollect",
          component: () => import("../views/UserPage/UserCollectPage.vue"),
        },
        {
          path: "active",
          name: "userActive",
          component: () => import("../views/UserPage/UserActivePage.vue"),
        },
        {
          path: "follow",
          component: () => import("../views/UserPage/UserFollowPage.vue"),
          children: [
            {
              path: "follow",
              name: "follow",
              component: () => import("../components/UserPage/UserFollow.vue"),
            },
            {
              path: "fans",
              name: "fans",
              component: () => import("../components/UserPage/UserFans.vue"),
            },
            {
              path: "",
              redirect: "NotFound", // 重定向到 /user/main
            },
          ],
        },
        {
          path: "", // 当用户访问 /user 时
          redirect: "/user/main", // 重定向到 /user/main
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  // 如果用户已登录，检查 token 是否有效
  if (userStore.isLoggedIn) {
    const tokenValid = await checkToken();

    // 如果 token 无效，则执行注销操作
    if (!tokenValid) {
      userStore.logout();
    }
  }

  // 继续导航
  window.scrollTo(0, 0);
  next();
});
export default router;
