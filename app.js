//app.js
var http = require('utils/httputils.js'); //相对路径
App({
  data: {
    customerTelephone: '0913-3781005',
    baseUrl: 'https://www.fanjiasmarttown.com/api/',
    //baseUrl: 'http://127.0.0.1:8089/api/',
    baseYsUrl: 'https://open.ys7.com/api/',
    token: '', //Authorization
    loginInfo: null, //登录信息，包含access_token和refresh_token
    phone: '', // 手机号
    user: null, //用户信息 
    userId: null, //用户的id
    roleId: wx.getStorageSync('roleId'), //用户权限id
    openId: wx.getStorageSync('openId'), //用户openId
    appId: wx.getStorageSync('appId'), //appId
    appSecret: wx.getStorageSync('appSecret'), //appSecret
    appYsKey: wx.getStorageSync('appYsKey'), //萤石云appkey
    appYsSecret: wx.getStorageSync('appYsSecret'),
    nickName: wx.getStorageSync('nickName'),
    reg: '/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/',
    isDebug: false // 日志开关
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getWxAppInfo();
  },
  globalData: {},

  //获取萤石云Token
  getYsAccessToken() {
    var prams = {
      appKey: wx.getStorageSync('appYsKey'),
      appSecret: wx.getStorageSync('appYsSecret')
    }
    http.postRequest(this.data.baseYsUrl + "lapp/token/get", prams,
      function (res) {
        wx.setStorageSync('accessYstoken', res.data.accessToken)
      },
      function (err) {

      })
  },
  /**
   * 获取微信info
   */
  getWxAppInfo() {
    var that = this;
    var prams = {}
    http.httpGetRequest(this.data.baseUrl + "sys/getWxAppInfo", prams,
      function (res) {
        if (res.data) {
          wx.setStorageSync('appId', res.data.appId)
          wx.setStorageSync('appSecret', res.data.appSecret)
          wx.setStorageSync('appYsKey', res.data.appYsKey)
          wx.setStorageSync('appYsSecret', res.data.appYsSecret)
        }
        that.getYsAccessToken();
      },
      function (err) {})
  },
})