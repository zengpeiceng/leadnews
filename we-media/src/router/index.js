import { createRouter, createWebHistory } from "vue-router";
import { NavigationFailureType, isNavigationFailure } from "vue-router";
import routes from "./routes";
import store from '../store';
import storage from "../utils/localStorage";
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login" && !storage.getItem("token")) {
    if(from.path != "/") {
      store.commit("changeSysDialogStatus", true);
    } else {
      next({path: "/login"});
    }
  } else {
    next();
  } 
});
export default router;
