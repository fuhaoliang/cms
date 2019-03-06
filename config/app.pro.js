module.exports = {
  env: 'prod',
  v: 'version', //版本號
  // 用户环境
  user: 'user',
  baseApi: 'https://passport.homestyler.com',
  clientId: 'hs7dbc0d1026eb34829a7d71170fb3ae0a2d197b017b50a77887019b65074ddfc6',
  // 账号绑钉钉的第三方dingId
  dingId: 'dingoar4eteffscespfvo8',
  dingBackUrl: 'https://www.homestyler.com/cn/static/ding.html',
  // 账号绑淘宝的第三方dingId
  taobaoId: '25058667',
  taobaoBackUrl: 'https://passport.homestyler.com/sso/api/oauth/third-party?env=prod',
  taobaoCodeUrl: 'https://oauth.taobao.com/authorize',
  // 品牌商模型后台
  model: 'https://jia.taobao.com/ihome-merchant/',
  // 登录链接
  loginUrl: 'https://rms.homestyler.com/sso',
  // 网关
  gateway: 'https://api.homestyler.com',
  // 商城
  mall: 'https://mall.homestyler.com/cn/',
  // 论坛
  bbs: 'https://bbs.homestyler.com/cn/',
  // 案例
  case: 'https://design.homestyler.com/cn/',
  // 商家平台
  erchantmP: 'https://b.homestyler.com',
  // 全国门店
  nationaltoresS: 'https://www.homestyler.com/cn/static/pages/map/index.html',
  // 装修服务
  renovation: 'https://www.homestyler.com/cn/taocan',
  // 设计师主页
  designer: 'https://designer.homestyler.com/cn/',
  // 新版首页
  newHome: 'https://www.homestyler.com/cn/',
  // 3d
  design3d: 'https://3d.homestyler.com/cn/',
  // oss图片地址
  imgUrl: 'https://img.homestyler.com',
  // 个人中心
  newpPersonal: 'https://my.homestyler.com/cn/',
  // 数据分析
  dataAnalysis: 'https://api.homestyler.com',
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
  jrMall: 'https://b.homestyler.com',
  // 商户
  merchant: 'https://v.homestyler.com',
  // 商户在权限中的applicationID
  application: 2,
  // robin
  Robin: 'https://jr-pim.homestyler.com',
  // robin  3D
  Robin3D: 'https://3d.homestyler.com/cn/',
  // robinModel
  RobinModel: 'https://pbo.homestyler.com'
}
