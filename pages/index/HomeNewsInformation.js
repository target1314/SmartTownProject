// pages/index/HomeNewsInformation.js
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamicInformation: null,
    type: '',
    isData: true
  },

  //获取动态信息
  getDynamicInformationData() {
    var that = this;
    var prams = {
      type: this.data.type
    }
    http.getRequest(app.data.baseUrl + "spb/getDynamicInformation", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            dynamicInformation: res.data,
            isData: true
          })
        } else {
          that.setData({
            isData: false
          })
        }
      },
      function (err) {
        that.setData({
          isData: false
        })
      })
  },
  /**
   * 互动详情
   */
  dynamicDetail: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../partybuilding/dynamicDetail?name=' + data.title + '&id=' + data.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      type: options.type
    })
    this.getDynamicInformationData();
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