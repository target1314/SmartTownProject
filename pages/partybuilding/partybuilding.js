// pages/partybuilding/partybuilding.js
//获取应用实例
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: null,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    chunnelDefault: [{
        name: '党建动态',
        type: '1',
        image: '/image/home/dongtai.png'
      },
      {
        name: '主题教育',
        type: '2',
        image: '/image/home/xuexi.png'
      }, {
        name: '三会一课',
        type: '3',
        image: '/image/home/jiaoyu.png'
      },
      {
        name: '论坛互动',
        type: '4',
        image: '/image/home/hudong.png'
      },
    ],
    dynamicInformation: null, //动态信息
    studyInformation: null, //学习信息
    navbar: ['最新动态', '学习课程'],
    currentTab: 0,
    news: null,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    Hei: "", //这是swiper要动态设置的高度属性
  },

  /**
   * Tab点击
   * @param {} e 
   */
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 轮播图
   * @param {}} e 
   */
  swiperChange: function (e) {
    let {
      current,
      source
    } = e.detail
    if (source === 'autoplay' || source === 'touch') {
      //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
      this.setData({
        swiperCurrent: current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.getAdvData();
    this.getHorseRaceLampData();
    this.getDynamicInformationData();
    this.getStudyInformationData();
  },

  //获取Banner广告
  getAdvData() {
    var that = this;
    var prams = {
      type: 1
    }
    http.getRequest(app.data.baseUrl + "spb/getAdvertisement", prams,
      function (res) {
        that.setData({
          imgUrls: res.data
        })
      },
      function (err) {})
  },

  //获取消息跑马灯
  getHorseRaceLampData() {
    var that = this;
    var prams = {
      type: 1
    }
    http.getRequest(app.data.baseUrl + "spb/getHorseRaceLamp", prams,
      function (res) {
        that.setData({
          news: res.data
        })
      },
      function (err) {})
  },

  //获取党建动态信息
  getDynamicInformationData() {
    var that = this;
    var prams = {
      type: 5
    }
    http.getRequest(app.data.baseUrl + "spb/getDynamicInformation", prams,
      function (res) {
        that.setData({
          dynamicInformation: res.data
        })
      },
      function (err) {})
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

  //事件处理函数
  goclick: function (e) {
    let data = e.currentTarget.dataset.item,
      type = data.type;
    switch (type) {
      case "1":
        wx.navigateTo({
          url: '../partybuilding/dynamic?name=' + data.name + '&type=5'
        })
        break
      case "2":
        wx.navigateTo({
          url: '../partybuilding/study?name=' + data.name
        })
        break
      case "3":
        wx.navigateTo({
          url: '../partybuilding/dynamic?name=' + data.name + '&type=6'
        })
        break
      case "4":
        if (wx.getStorageSync('openId')) {
          wx.navigateTo({
            url: '../partybuilding/interaction?name=' + data.name
          })
        } else {
          this.loginJundge();
        }
        break
    }
  },


  /**
   * 是否登录
   */
  loginJundge: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你还未登录，请先登录！',
      success(res) {
        if (res.confirm) {
        }
      }
    })
  },
  
  /**
   * 通知查看内容
   * @param {} params 
   */
  noticeClick: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../partybuilding/dynamicDetail?name=' + data.title + '&content=' + data.content + '&id=' + data.id + '&type=2'
    })
  },

  /**
   * 互动详情
   */
  dynamicDetail: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../partybuilding/dynamicDetail?name=' + data.title + '&content=' + data.content + '&id=' + data.id
    })
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
   * 图片高度
   * @param {} e 
   */
  imgH: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height; //图片高度
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw + "px" //等比设置swiper的高度。  即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度    ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    this.setData({
      Hei: swiperH //设置高度
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