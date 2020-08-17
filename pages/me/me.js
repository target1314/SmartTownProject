// pages/me/me.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    showAuth: true
  },
  auth: function (e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      showAuth: false
    })
  },
  //绑定手机
  bindphone: function () {
    wx.navigateTo({
      url: '../bindphone/bindphone'
    })
  },
  //设置
  setbtn: function () {
    wx.navigateTo({
      url: '../me/setting'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    //可以通过 wx.getSetting 先查询一下用户是否授权了
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 必须是在用户已经授权的情况下调用
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo,
                showAuth: false
              })
            }
          })
        }
      }
    })
  },
})