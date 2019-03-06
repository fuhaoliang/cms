module.exports = {
  env: 'uat',
  v: 'version', //版本號
  // 用户环境
  user: 'user_uat',
  baseApi: 'https://uat-passport.homestyler.com',
  clientId: 'hs-uat-0acd53b79d4453df62e504ca449530d619ec3b6232cebf89dc3579a0268a7fcf',
  // 账号绑钉钉的第三方dingId
  dingId: 'dingoar4eteffscespfvo8',
  dingBackUrl: 'https://uat-www.homestyler.com/cn/static/ding.html',
  // 账号绑淘宝的第三方dingId
  taobaoId: '25058667',
  taobaoBackUrl: 'https://passport.homestyler.com/sso/api/oauth/third-party?env=uat',
  taobaoCodeUrl: 'https://oauth.taobao.com/authorize',
  // 品牌商模型后台
  model: 'https://jia.taobao.com/ihome-merchant/',
  // 登录链接
  loginUrl: 'https://uat-rms.homestyler.com/sso',
  // 网关
  gateway: 'https://aly-uat-api.homestyler.com',
  // 商城
  mall: 'https://uat-mall.homestyler.com/cn/',
  // 论坛
  bbs: 'https://uat-bbs.homestyler.com/cn/',
  // 案例
  case: 'https://uat-design.homestyler.com/cn/',
  // 商家平台
  erchantmP: 'https://uat-b.homestyler.com',
  // 全国门店
  nationaltoresS: 'https://uat-www.homestyler.com/cn/static/pages/map/index.html',
  // 装修服务
  renovation: 'https://uat-www.homestyler.com/cn/taocan',
  // 设计师主页
  designer: 'https://uat-designer.homestyler.com/cn/',
  // 新版首页
  newHome: 'https://uat-www.homestyler.com/cn/',
  // 3d
  design3d: 'https://uat-3d.homestyler.com/cn/',
  // oss图片地址
  imgUrl: 'https://shejijia-uat.oss-cn-beijing.aliyuncs.com',
  // 个人中心
  newpPersonal: 'https://uat-my.homestyler.com/cn/',
  // 数据分析
  dataAnalysis: 'https://aly-uat-api.homestyler.com',
  // 类目树的固定ID
  categoryTreeID: {
    firstRootId: '',
    CBDid: '',
    defaultId: '',
    brandOwner: '',
    attributeQueryId: ''
  },
  //商户的组对应
  GroupList: {
    VSuperAdmin: 'vEnterpriseSystemAdminGroup',
    VAdmin: 'vEnterpriseAdminGroup',
    VOperation: 'vEnterpriseOperatorGroup',
    VManufacturer: 'vEnterpriseManufacturerGroup',
    VTrader: 'vEnterpriseDealerGroup',
    VDecoration: 'vEnterpriseDecoratorGroup'
  },
  // 厂商
  jrMall: 'https://uat-b.homestyler.com',
  // 商户
  merchant: 'https://uat-v.homestyler.com',
  // 商户在权限中的applicationID
  application: 40,
  // robin
  Robin: 'https://jr-uat-pim.homestyler.com',
  // robin  3D
  Robin3D: 'https://uat-3d.homestyler.com/cn/',
  // robinModel
  RobinModel: 'https://jr-uat-pbo.homestyler.com'
}
