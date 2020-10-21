// pages/partybuilding/study.js
//获取应用实例
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyInformation: null
  },

  //获取学习信息
  getStudyInformationData() {
    var that = this;
    var prams = {}
    http.getRequest(app.data.baseUrl + "spb/getStudyInformation", prams,
      function (res) {
        that.setData({
          studyInformation: res.data
        })
      },
      function (err) {})
  },

  /**
   * 播放视频
   * @param {}} e 
   */
  goVideoDetail: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../video/videodetail?name=' + data.title + '&videoUrl=' + data.url + '&id=' + data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.getStudyInformationData();
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