//app.js
var http = require('utils/httputils.js'); //相对路径
App({
  data: {
    baseUrl: '',
    baseYsUrl: 'https://open.ys7.com/api/',
    token: '', //Authorization
    loginInfo: null, //登录信息，包含access_token和refresh_token
    phone: '', // 手机号
    user: null, //用户信息
    userId: null, //用户的id
    appYsKey: 'b623a1c07c654c1babda79ca183563ab', //萤石云appkey
    appYsSecret: 'f40d43bc0980e64a360af555c8f1b135'
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
        console.log(res.data.accessToken)
        wx.setStorageSync('accessYstoken', res.data.accessToken)
      },
      function (err) {

      })
  }
})