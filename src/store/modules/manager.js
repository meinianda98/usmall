import { reqUserList, reqUserCount } from '../../utils/request'
const state = {
  list: [],
  total: 0,
  size:2,
  page:1 //当前第几页
}

const mutations = {
  changeList(state, arr) {
    state.list = arr
  },
  changeCount(state, total) {
    state.total = total
  },
  //获取当前页
  changePage(state,page){
    state.page = page
  }
}

const actions = {
  requestUserList(context) {
    reqUserList({ size: context.state.size, page: context.state.page }).then(res => {
      context.commit('changeList', res.data.list)
    })
  },
  //获取总页数
  requestUserCount(context) {
    reqUserCount().then(res => {
      context.commit('changeCount', res.data.list[0].total)
    })
  },
  //修改当前页码数
  changeCurrentsPages(context,page){
    context.commit('changePage',page)
    context.dispatch('requestUserList')

  }

}

const getters = {
  list(state) {
    return state.list
  },
  total(state) {
    return state.total
  },
  size(state){
    return state.size
  },
  page(state){
    return state.page
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}