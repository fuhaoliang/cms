const app = {
  state: {
    permissions: {}, // 权限信息
    loading: false,
    loadingShow: false
  },
  mutations: {
    TOGGLE_LOADING: (state, bool) => {
      state.loading = bool
    },
    TOGGLE_LOADINGSHOW: (state, bool) => {
      state.loadingShow = bool
    }
  },
  actions: {}
}

export default app
