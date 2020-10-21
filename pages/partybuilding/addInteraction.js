// pages/partybuilding/addInteraction.js
const app = getApp()
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject: '',
    content: '',
    userId: wx.getStorageSync('userId')
  },
  /**
   * 标题
   * @param {} e 
   */
  subjectInput: function (e) {
    this.setData({
      subject: e.detail.value
    })
  },
  /**
   * 内容
   * @param {} e 
   */
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 发布
   * @param {*} e 
   */
  addBbs: function (e) {
    let subject = this.data.subject
    let content = this.data.content
    if (subject == '') {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return false
    } else if (content == '') {
      wx.showToast({
        title: '请输入内容描述',
        icon: 'none'
      })
      return false
    } else {
      this.checkContent();

    }
  },

  //检测敏感词
  checkContent() {
    var that = this;
    var prams = {
      content: that.data.content
    }
    http.httpPostRequest("https://api.weixin.qq.com/wxa/msg_sec_check?access_token=" + wx.getStorageSync('access_token'), prams,
      function (res) {
        if (res.errcode == 0) {
          that.addBbsData();
        } else {
          wx.showToast({
            title: '存在敏感词,请重新编辑内容',
            icon: 'none',
            duration: 3000,
          })
        }
      },
      function (err) {
        wx.showToast({
          title: '检测失败',
          icon: 'fail'
        })
      })
  },

  //添加互动主题
  addBbsData() {
    var that = this;
    var prams = {
      title: that.data.subject,
      content: that.data.content,
      userId: this.data.userId,
      giveType: 2,
      nickName: wx.getStorageSync('nickName'),
      avatarUrl: wx.getStorageSync('bgPic'),
    }
    http.httpPostRequest(app.data.baseUrl + "spb/addInterActiveInformation", prams,
      function (res) {
        wx.setStorageSync('isSuc', true)
        wx.showToast({
            title: '添加成功',
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
          title: '添加失败',
          icon: 'fail'
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布互动',
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