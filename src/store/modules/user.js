// import { logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Http from '@/utils/http'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login ({ commit }, args) {
      // const username = userInfo.username.trim()
      console.info('args', args)
      return new Promise(async (resolve, reject) => {
        const { params, options } = args
        const { status, data } = await Http.userApi.login(params, options)
        if (status.code === 0) {
          setToken(data.token)
          commit('SET_TOKEN', data.token)
        }
        resolve({ status })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        const token = 'Bearer ' + state.token
        console.info('token', token)
        const { status, data } = await Http.userApi.getUserInfo({}, {}, { Authorization: token })
        if (status.code === 0) {
          const { userInfo } = data
          if (userInfo.roles && userInfo.roles.length > 0) {
            // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', userInfo.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', userInfo.username)
          commit('SET_AVATAR', userInfo.avatar)
        }
        resolve({ status, data })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        const { status, data } = await Http.userApi.logout({}, { error: false })
        if (status.code !== -1) {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
        }
        resolve({ status, data })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
