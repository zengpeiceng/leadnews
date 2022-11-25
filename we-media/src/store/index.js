import { createStore } from "vuex";

export default createStore({
  state: {
    sysDialogShow: false,
  },
  getters: {},
  mutations: {
    changeSysDialogStatus(state, payload) {
      state.sysDialogShow = payload;
    }
  },
  actions: {}
});
