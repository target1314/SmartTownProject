// pages/bindphone/bindphone.js
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定手机'
    })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  /**
   * 绑定手机号
   * @param {} e 
   */
  bindPhone: function (e) {
    let phone = this.data.phone
    if (phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return false
    } else {
      this.bindPhoneData();
    }
  },

  //绑定用户手机号
  bindPhoneData() {
    var that = this;
    var prams = {
      phone: that.data.phone,
      openId: app.data.openId
    }
    http.postRequest(app.data.baseUrl + "user/bindPhone", prams,
      function (res) {
        wx.setStorageSync('phone', res.data.phone)
        wx.showToast({
            title: '绑定成功',
            icon: 'success'
          }),
          setTimeout(function () {
            wx.navigateBack({
              complete: (res) => {},
            })
          }, 3000)
      },
      function (err) {
        wx.showToast({
          title: '绑定失败',
          icon: 'fail'
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})