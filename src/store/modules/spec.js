import { reqSpecsList} from '../../utils/request'
const state = {
  list: []
}

const mutations = {
  changeList(state, arr) {
    state.list = arr
  },
}

const actions = {
  requestSpecsList(context) {
    reqSpecsList({ size: 10, page: 1 }).then(res => {
      res.data.list.forEach(item => {
        item.attrs = JSON.parse(item.attrs)
      });
      context.commit('changeList', res.data.list)
    })
  }
}

const getters = {
  list(state) {
    return state.list
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}