// pages/video/videodetail.js
var WxParse = require('../../wxParse/wxParse.js');
var http = require('../../utils/httputils.js'); //相对路径
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: '',
    isData: true,
    id: '',
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      videoUrl: options.videoUrl,
      id: options.id,
      title: options.name
    })
    this.getRichTextData();
    this.addStudyHistory();
  },


  //添加学习记录
  addStudyHistory() {
    var that = this;
    var prams = {
      studyId: that.data.id,
      url: that.data.videoUrl,
      title: that.data.title,
      userId: wx.getStorageSync('userId')
    }
    http.httpPostRequest(app.data.baseUrl + "spb/addStudyHistory", prams,
      function (res) {
      },
      function (err) {
      })
  },

  //获取富文本
  getRichTextData() {
    var that = this;
    var prams = {
      id: this.data.id
    }
    http.getRequest(app.data.baseUrl + 'spb/getStudyInformationRichText', prams,
      function (res) {
        if (res.data.content) {
          that.setData({
            richText: res.data,
            isData: true
          })
          WxParse.wxParse('article', 'html', that.data.richText.content, that, 5);
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
    wx.stopPullDownRefresh();
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