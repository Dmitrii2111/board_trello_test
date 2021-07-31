import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state() {
    return {
      columnTitles: [
        {name: 'on-hold', back: 'orange', id: 'on-hold', row: 0},
        {name: 'in-progress', back: 'blue', id: 'in-progress', row: 1},
        {name: 'needs-review', back: 'yellow', id: 'needs-review', row: 2},
        {name: 'approved', back: 'green', id: 'approved', row: 3}
      ],
      currentUser: [
        {userName: ''},
        {password: ''},
        {email: ''},
        {token: ''}
      ],
      loggedIn: '',
      log: true,
      newCard: {
        cardText: '',
        cardId: 0,
        row: '',
        seq_num: 0
      },
      currentCards: []
    }
  },
  mutations: {
    changeLogReg(state) {
      state.log = !state.log
    },
    setData(state, token) {
      state.currentUser.token = token
      localStorage.setItem('token', state.currentUser.token)
      localStorage.setItem('userName', state.currentUser.userName)
      localStorage.setItem('password', state.currentUser.password)
    }
  }
})