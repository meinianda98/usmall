import axios from 'axios'
import qs from 'qs'

//响应拦截
axios.interceptors.response.use(res => {
  console.log('---------请求的路径' + res.config.url + '---------');
  console.log(res);
  return res
})

const baseUrl = '/api'

//------------------------------菜单模块请求----------------------------------

//菜单添加
export const reqMenuAdd = (form) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: form
  })
}

//菜单列表
export const reqMenuList = (data) => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params: data
  })
}

//菜单获取(一条)
export const reqMenuInfo = (id) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: 'get',
    params: id
  })
}
//菜单修改
export const reqMenuEdit = (form) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: form

  })
}
//菜单删除
export const reqMenuDelete = (id) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data: id
  })
}

//------------------------------角色管理模块请求----------------------------------

//角色添加
export const reqRoleAdd = (data) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'post',
    data: data
  })
}
//角色列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: 'get'
  })
}
//角色获取(一条)
export const reqRoleInfo = (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'get',
    params: id

  })
}
//角色修改
export const reqRoleEdit = (data) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: data
  })
}
//角色删除
export const reqRoleDelete = (id) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: 'post',
    data: id
  })
}

//------------------------------管理员管理模块请求----------------------------------
//管理员添加
export const reqUserAdd = (form) => {
  return axios({
    url: baseUrl + '/api/useradd',
    method:'post',
    data:form

  })
}
//管理员列表(分页)
export const reqUserList = (params) => {
  return axios({
    url: baseUrl + '/api/userlist',
    method:'get',
    params:params
  })
}
//管理员获取(一条)
export const reqUserInfo = (uid) =>{
  return axios({
    url:baseUrl + '/api/userinfo',
    method:'get',
    params:uid
  })
}
//管理员修改
export const reqUserEdit = (data) => {
  return axios({
    url:baseUrl + '/api/useredit',
    method:'post',
    data:data
  })
}
//管理员删除
export const reqUserDelete = (data) => {
  return axios({
    url:baseUrl + '/api/userdelete',
    method:'post',
    data,
  })
}
//管理员登录
export const reqUserLogin = (data) => {
  return axios({
    url:baseUrl + '/api/userlogin',
    method:'post',
    data,
  })
}
//管理员总数(用于计算分页)
export const reqUserCount = () => {
  return axios({
    url: baseUrl + '/api/usercount',
    method: 'get'
  })
}

//------------------------------商品分类管理模块请求----------------------------------

//商品分类添加,此处图片需用qs转一下
export const reqCateAdd = (data) => {
  let form = new FormData()
  for(let key in data){
    form.append(key,data[key])
  }
  return axios({
    url:baseUrl + '/api/cateadd',
    method:'post',
    data:form    
  })
}
//商品分类列表
export const reqCateList = (params) => {
  return axios({
    url:baseUrl + '/api/catelist',
    method:'get',
    params,
  })
}
//商品分类获取（一条）
export const reqCateInfo = (params) => {
  return axios({
    url:baseUrl + '/api/cateinfo',
    method:'get',
    params,
  })
}
//商品分类修改(一条)
export const reqCateEdit = (data) => {
  let form = new FormData()
  for(let key in data){
    form.append(key,data[key])
  }
  return axios({
    url:baseUrl + '/api/cateedit',
    method:'post',
    data:form
  })
}
//商品分类删除
export const reqCateDelete = (id) => {
  return axios({
    url:baseUrl + '/api/catedelete',
    method:'post',
    data:id
  })
}
//------------------------------商品规格管理模块请求----------------------------------
//商品规格添加
export const reqSpecsAdd = (data) => {
  return axios({
    url:baseUrl + '/api/specsadd',
    method:'post',
    data,
  })
}
//商品总数(用于计算分页)
export const reqGoodsCount = () => {
  return axios({
    url:baseUrl + '/api/goodscount',
    method:'get',
  })
}
//商品规格列表（分页）
export const reqSpecsList = (params) => {
  return axios({
    url:baseUrl + '/api/specslist',
    method:'get',
    params,
  })
}
//商品规格获取（一条）
export const reqSpecsInfo = (params) => {
  return axios({
    url:baseUrl + '/api/specsinfo',
    method:'get',
    params,
  })
}
//商品规格修改
export const reqSpecsEdit = (data) => {
  return axios({
    url:baseUrl + '/api/specsedit',
    method:'post',
    data,
  })
}
//商品规格删除
export const reqSpecsDelete = (data) => {
  return axios({
    url:baseUrl + '/api/specsdelete',
    method:'post',
    data,
  })
}