import { getUserInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'
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
    state.userInfo = {}
    state.token = ''
  },
  updateToken: (state, token) => {
    state.token = token
  }
}

const actions = {
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(data => {
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

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      resetRouter()
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

