const http = {
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
  actions: {
    ToggleLoading: ({ commit }, bool) => {
      commit('TOGGLE_LOADING', bool)
    },
    ToggleLoadingShow: ({ commit }, bool) => {
      commit('TOGGLE_LOADINGSHOW', bool)
    }
  }
}

export default http
