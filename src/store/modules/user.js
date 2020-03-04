import { logout, getUserInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: '',
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  updateUserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  updateToken: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      console.log(username, password)
      commit('SET_TOKEN', 'data.token')
      setToken('data.token')
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('获取用户信息失败，请重新登录')
        }

        commit('updateUserInfo', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        console.log('longout')
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

