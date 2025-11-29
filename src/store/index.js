import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    userInfo: null
  },
  mutations: {
    setLoginStatus(state, payload) {
      state.isLoggedIn = payload.isLoggedIn
      state.userInfo = payload.userInfo

      // Đồng bộ với localStorage
      if (payload.isLoggedIn && payload.userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(payload.userInfo))
      } else {
        localStorage.removeItem('userInfo')
      }
    }
  },
  actions: {
    login({ commit }, userData) {
      commit('setLoginStatus', { isLoggedIn: true, userInfo: userData })
    },
    logout({ commit }) {
      commit('setLoginStatus', { isLoggedIn: false, userInfo: null })
    },
    // Thêm action này để khôi phục khi reload trang
    initAuth({ commit }) {
      const saved = localStorage.getItem('userInfo')
      if (saved) {
        const user = JSON.parse(saved)
        commit('setLoginStatus', { isLoggedIn: true, userInfo: user })
      }
    }
  },
  getters: {
    getLoginStatus: state => state.isLoggedIn,
    getUserInfo: state => state.userInfo
  }
})