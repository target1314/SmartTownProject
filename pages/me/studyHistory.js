// pages/me/studyHistory.js
//获取应用实例
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studyInformation: null, //学习信息
    isData: true, //是否有数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '学习记录'
    })
    this.getStudyInformationData();
  },

  /**
   * 播放视频
   * @param {}} e 
   */
  goVideoDetail: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../video/videodetail?name=' + data.title + '&videoUrl=' + data.url + '&id=' + data.studyId,
    })
  },
  /**
   * 长按删除
   * @param {}} e 
   */
  longTap: function (e) {
    var that = this;
    let data = e.currentTarget.dataset;
    var itemList = this.data.studyInformation;
    var index = data.index;
    wx.showModal({
      title: '提示',
      content: '你确定删除吗？',
      success(res) {
        if (res.confirm) {
          that.delStudyHistoryData(data.id, index, itemList);
        }
      }
    })
  },

  /**
   * 删除学校记录
   * @param {*} id 
   * @param {*} itemList 
   */
  delStudyHistoryData(id, index, itemList) {
    var that = this;
    var prams = {}
    http.deleteRequest(app.data.baseUrl + "/spb/delStudyHistory/" + id, prams,
      function (res) {
        itemList.splice(index, 1)
        that.setData({
          studyInformation: itemList,
        })
        if (that.data.studyInformation.length > 0) {
          that.setData({
            isData: true
          })
        } else {
          that.setData({
            isData: false
          })
        }
      },
      function (err) {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 1000,
        })
      })
  },
  //获取学习信息
  getStudyInformationData() {
    var that = this;
    var prams = {
      userId: wx.getStorageSync('userId')
    }
    http.getRequest(app.data.baseUrl + "spb/getStudyHistory", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            studyInformation: res.data,
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