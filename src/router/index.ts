import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
      path: "/video",
      name: "video",
      component: () => import("../views/VideoPage.vue"),
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("../views/UserManagePage.vue"),
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserPage/UserPage.vue"),
      children: [
        {
          path: "video",
          name: "userVideo",
          component: () => import("../views/UserPage/UserVideoPage.vue"),
        },
        {
          path: "main",
          name: "userMain",
          component: () => import("../views/UserPage/UserMainPage.vue"),
        },
      ],
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

export default router;
