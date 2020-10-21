// pages/partybuilding/dynamicDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var http = require('../../utils/httputils.js'); //相对路径
var util = require('../../utils/timeUtils.js');
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    richText: '',
    id: '',
    publisher: '',
    time: '',
    isData: true, //是否有数据
    noDataTips: '',
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      title: options.name,
      id: options.id,
      type: options.type
    })
    wx.setNavigationBarTitle({
      title: options.name
    })
    if (options.type == 1) {  //农产品
      this.setData({
        noDataTips: '暂无信息'
      })
      this.getRichTextData('spb/getFarmProductRichText');
    } else if (options.type == 2) {  //跑马灯
      this.setData({
        noDataTips: '暂无会议'
      })
      this.getRichTextData('spb/getHorseRichText');
    } else {  //动态
      this.setData({
        noDataTips: '暂无信息'
      })
      this.getRichTextData('spb/getDynamicRichText');
    }
  },

  //获取富文本
  getRichTextData(url) {
    var that = this;
    var prams = {
      id: this.data.id
    }
    http.getRequest(app.data.baseUrl + url, prams,
      function (res) {
        if (res.data.content) {
          that.setData({
            richText: res.data,
            time: util.js_date_time(res.data.createTime),
            publisher: res.data.userName,
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