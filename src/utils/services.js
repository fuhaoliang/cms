// const api = 'https://www.baidu.com'
const app = require('../../config/app')
const userApi = {
  host: app.baseApi,
  uploadImage: {
    method: 'post',
    url: '/upload'
  },
  login: {
    method: 'post',
    url: '/user/login'
  },
  logout: {
    method: 'post',
    url: '/user/logout'
  },
  getUserInfo: {
    method: 'get',
    url: '/user/userinfo'
  }
}

const articleApi = {
  host: app.baseApi,
  addAtricle: {
    method: 'post',
    url: '/article/create'
  },
  getAtricleInfo: {
    method: 'get',
    url: '/atricle/{id}'
  },
  getTags: {
    method: 'get',
    url: '/tags'
  }
}

export default {
  userApi,
  articleApi
}
