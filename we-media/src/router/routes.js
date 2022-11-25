import HomeView from "../views/HomeView.vue";
export default [
  {
    path: "/",
    name: "home",
    redirect: "/graphic/index",
    component: HomeView,
    children: [
      {
        path: "/graphic",
        redirect: "/graphic/index",
        component: () => import("/src/views/graphic/GraphicView.vue"),
        children: [
          {
            path: "/graphic/index",
            component: () =>
              import("/src//views/graphic/c-cpn/GraphicIndex.vue"),
          },
          {
            path: "/graphic/detail",
            component: () =>
              import("/src/views/graphic/c-cpn/GraphicDetail.vue"),
            meta: {
              ativeMenu: "/graphic/index",
            },
          },
        ],
      },
      {
        path: "/article",
        component: () => import("/src/views/article/ArticleView.vue"),
      },
      {
        path: "/contentlist",
        component: () => import("/src/views/contentlist/ContentList.vue"),
      },
      {
        path: "/material",
        component: () => import("/src/views/material/MaterialView.vue"),
      },
      {
        path: "/fans",
        component: () => import("/src/views/fans/FansView.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("/src/views/login/Login.vue"),
  },
  {
    path: "/:path(.*)",
    component: () => import("/src/components/NotFound.vue"),
  },
];
