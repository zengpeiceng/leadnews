import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('/src//views/login/Login.vue')
    },
    {
      path: "/",
      redirect: "/channel/index",
      component: () => import("/src/views/Index.vue"),
      meta: {title: '黑马后台管理'},
      children: [
        {
          path: "/auth",
          redirect: "/auth/index",
          component: () => import("/src/views/auth/Auth.vue"),
          children: [
            {
              path: "/auth/index",
              component: () => import("/src/views/auth/c-cpn/AuthIndex.vue"),
            },
            {
              path: "/auth/detail",
              component: () => import("/src/views/auth/c-cpn/AuthDetail.vue"),
              props: true,
              meta: {activeMenu: "/auth/index"}
            }
          ]
        },
        {
          path: "/channel/index",
          component: () => import("/src/views/channel/Channel.vue"),
        },
        {
          path: "/news",
          redirect: 'news/index',
          component: () => import("/src/views/news/News.vue"),
          children: [
            {
              path: '/news/index',
              component: () => import('/src/views/news/c-cpn/NewsIndex.vue'),
            },
            {
              path: "/news/detail",
              component: () => import('/src/views/news/c-cpn/NewsDetail.vue'),
              meta: {activeMenu: '/news/index'},
            },
          ],
        },
        {
          path: "/news-published",
          redirect: '/news-published/index',
          component: () => import("/src/views/news-published/NewsPublished.vue"),
          children: [
            {
              path: "/news-published/index",
              component: () => import("/src/views/news-published/c-cpn/NewsPublishedIndex.vue"),
            },
            {
              path: "/news-published/detail",
              component: () => import("/src/views/news-published/c-cpn/NewsPublishedDetail.vue"),
              meta: {activeMenu: '/news-published/index'},
            }
          ]
        },
        {
          path: "/sensitive/index",
          component: () => import("/src/views/sensitive/Sensitive.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if(to.path === '/login') return next()
  if(!token) return next('/login')
  next();
});

export default router;
