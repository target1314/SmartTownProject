// pages/partybuilding/education.js
//获取应用实例
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leader: null,
    ordinary: null,
    isData: true, //是否有数据
  },

  //获取党员信息
  getStudyInformationData() {
    var that = this;
    var prams = {}
    http.getRequest(app.data.baseUrl + "spb/getMemberOrganizations", prams,
      function (res) {
        if (res.data[0].leader.length > 0 && res.data[0].ordinary > 0) {
          that.setData({
            leader: res.data[0].leader.lean,
            ordinary: res.data[0].ordinary,
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
   * 党员信息
   * @param {} e 
   */
  memberDetail: function (e) {
    var item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../partybuilding/memberInformation?data=' + encodeURIComponent(item),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name + '成员'
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