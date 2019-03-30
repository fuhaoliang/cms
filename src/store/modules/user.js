import { logout, getInfo } from '@/api/login'
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
        const { status, data } = await Http.gateway.login(params, options)
        console.info('params---->', params)
        if (status.code === 0) {
          setToken(data.token)
          commit('SET_TOKEN', data.token)
        }
        resolve({ status, data })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
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
