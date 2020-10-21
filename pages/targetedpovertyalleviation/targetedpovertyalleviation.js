// pages/targetedpovertyalleviation/targetedpovertyalleviation.js
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    searchKey: '',
    list: [],
    isData: true, //是否有数据
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

  //搜索文本
  serachInput: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },

  //搜索
  searchBtn: function () {
    var that = this;
    let inputValue = this.data.searchKey
    if (inputValue == '') {
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none'
      })
      return false
    } else {
      that.searchTargetedpovertyalleviationData();
    }
  },

  //搜索精准扶贫数据
  searchTargetedpovertyalleviationData() {
    var that = this;
    var prams = {
      helpProject: this.data.searchKey
    }
    http.getRequest(app.data.baseUrl + "searchPovertyAlleviationRecord", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            list: res.data,
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
  //添加数据
  addBtnCLick: function () {
    wx.navigateTo({
      url: '../targetedpovertyalleviation/addTargetedpovertyalleviation',
    })
  },
  //查看详情
  itemClick: function (e) {
    var item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../targetedpovertyalleviation/targetedpovertyalleviationDetail?data=' + item,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.getTargetedpovertyalleviationData();
  },

  //获取精准扶贫
  getTargetedpovertyalleviationData() {
    var that = this;
    var prams = {}
    http.getRequest(app.data.baseUrl + "povertyAlleviationRecord", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            list: res.data,
            isData:true
          })
        }else{
          that.setData({
            isData:false
          })
        }
      },
      function (err) {
        that.setData({
          isData:false
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
    this.getTargetedpovertyalleviationData();
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