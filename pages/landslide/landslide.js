// pages/landslide/landslide.js
//获取应用实例
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1, //当前请求数据是第几页
    pageSize: 10, //每页数据条数
    hasMoreData: true,
    isData: true, //是否有数据
  },
  //打开萤石云播放
  govideodetail: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateToMiniProgram({
      appId: 'wxf2b3a0262975d8c2',
      path: 'pages/live/live?accessToken=' + wx.getStorageSync('accessYstoken') + '&deviceSerial=' + data.deviceSerial + '&channelNo=' + data.channelNo,
      success(res) {
        // 打开成功
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.getCameraList();
  },

  //获取萤石云Token
  getCameraList() {
    var that = this;
    var prams = {
      accessToken: wx.getStorageSync('accessYstoken'),
      pageStart: that.data.page,
      pageSize: that.data.pageSize,
    }
    http.postRequest(app.data.baseYsUrl + "lapp/camera/list", prams,
      function (res) {
        var contentlistTem = that.data.list;
        var contentlist = res.data;
        var pageData = res.page;
        if (contentlist.length < that.data.pageSize) {
          that.setData({
            list: contentlistTem.concat(contentlist),
            hasMoreData: false,
            isData: true
          })
        } else {
          that.setData({
            list: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: that.data.page + 1
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getCameraList();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getCameraList();
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})