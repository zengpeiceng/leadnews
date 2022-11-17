import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { getItem } from '../hook/localStorage'
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path !== "/login" && !getItem("token")) {
    next({path: "/login"});
  }else {
    next();
  }
})
export default router
