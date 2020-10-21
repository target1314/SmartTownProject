//app.js
var http = require('utils/httputils.js'); //相对路径
App({
  data: {
    customerTelephone:'0913-3781005',
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
    appId: 'wx86a3fe0373f614fd', //appId
    appSecret: '3ba1ac7e501cc497e23314b44cc7deff', //appSecret
    appYsKey: 'b623a1c07c654c1babda79ca183563ab', //萤石云appkey
    appYsSecret: 'f40d43bc0980e64a360af555c8f1b135',
    nickName: wx.getStorageSync('nickName'),
    reg: '/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/',
    isDebug:false // 日志开关
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getYsAccessToken();
  },
  globalData: {},
  //获取萤石云Token
  getYsAccessToken() {
    var prams = {
      appKey: this.data.appYsKey,
      appSecret: this.data.appYsSecret
    }
    http.postRequest(this.data.baseYsUrl + "lapp/token/get", prams,
      function (res) {
        wx.setStorageSync('accessYstoken', res.data.accessToken)
      },
      function (err) {

      })
  }
})