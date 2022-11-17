import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: "/graphic/index",
      component: HomeView,
      children: [
        {
          path: "/graphic",
          redirect: "/graphic/index",
          component: () => import("@/views/graphic/GraphicView.vue"),
          children: [
            {
              path: "/graphic/index",
              component: () => import("@/views/graphic/c-cpn/GraphicIndex.vue")
            },
            {
              path: "/graphic/detail",
              component: () => import("@/views/graphic/c-cpn/GraphicDetail.vue"),
              meta: {
                ativeMenu: "/graphic/index"
              }
            }

          ]
        },
        {
          path: "/article",
          component: () => import("@/views/article/ArticleView.vue")
        },
        {
          path: "/contentlist",
          component: () => import("@/views/contentlist/ContentList.vue"),
        },
        {
          path: "/material",
          component: () => import("@/views/material/MaterialView.vue")
        },
        {
          path: "/fans",
          component: () => import("@/views/fans/FansView.vue")
        }
      ]
    },
  ]
})

export default router
