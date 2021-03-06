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
  delArticle: {
    method: 'delete',
    url: '/article/delete'
  },
  getAtricleInfo: {
    method: 'get',
    url: '/article/{id}'
  },
  patchAtricle: {
    method: 'patch',
    url: '/article/{id}'
  },
  getArticles: {
    method: 'get',
    url: '/articles'
  },
  getTags: {
    method: 'get',
    url: '/tags'
  },
  getArticlesCount: {
    method: 'get',
    url: '/articles/count'
  }
}

export default {
  userApi,
  articleApi
}
