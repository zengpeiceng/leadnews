import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: "/graphic",
      component: HomeView,
      children: [
        {
          path: "/graphic",
          component: () => import("@/views/graphic/GraphicView.vue")
        }
      ]
    },
  ]
})

export default router
