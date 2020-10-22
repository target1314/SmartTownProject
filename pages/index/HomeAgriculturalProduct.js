// pages/index/HomeAgriculturalProduct.js
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynamicInformation: [],
    type: '',
    isData: true,
    curTab: 0,
    current: 0,
    farmTypes: [],
  },
  selectTab(e) {
    var that = this;
    let index = e.target.dataset.index;
    this.setData({
      curTab: index,
      current: index
    })
    that.getFarmProductByTypeData(index + 1);
  },
  swiperChange(e) {
    var that = this;
    let index = e.detail.current;
    this.setData({
      curTab: index,
      current: index
    })
    that.getFarmProductByTypeData(index + 1);
  },

  /**
   * 互动详情
   */
  dynamicDetail: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../partybuilding/dynamicDetail?name=' + data.title + '&type=1' + '&id=' + data.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.setData({
      type: options.type
    })
    this.getAllFarmTypes();
  },

  //获取查询全部农副产品类型
  getAllFarmTypes() {
    var that = this;
    var prams = {}
    http.getRequest(app.data.baseUrl + "getAllFarmTypes", prams,
      function (res) {
        that.setData({
          farmTypes: res.data
        })
        that.getFarmProductByTypeData(1);
      },
      function (err) {})
  },

  //根据类型获取农产品
  getFarmProductByTypeData(type) {
    var that = this;
    var prams = {
      type: type
    }
    http.getRequest(app.data.baseUrl + "spb/getFarmProductByType", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            dynamicInformation: res.data,
            isData: true
          })
        } else {
          that.setData({
            isData: false,
            dynamicInformation:null
          })
        }
      },
      function (err) {
        that.setData({
          isData: false,
          dynamicInformation:null
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
    this.getFarmProductByTypeData(this.data.current + 1);
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