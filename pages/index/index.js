//index.js
var http = require('../../utils/httputils.js'); //相对路径
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: null,
    dynamicInformation: null, //动态信息
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    Hei: wx.getStorageSync('swiperH'), //这是swiper要动态设置的高度属性
    news: null,
    chunnelDefault: [{
        name: '智慧党建',
        type: 1,
        image: '/image/home/dangjian.png'
      },
      {
        name: '范家故事',
        type: 2,
        image: '/image/home/gushi.png'
      },
      {
        name: '新闻资讯',
        type: 3,
        image: '/image/home/zixun.png'
      },
      {
        name: '便民服务',
        type: 4,
        image: '/image/home/fuwu.png'
      },
      {
        name: '农副产品',
        type: 5,
        image: '/image/home/nongfu.png'
      },

      {
        name: '相关政策',
        type: 6,
        image: '/image/home/zhengce.png'
      },
    ]
  },
  //事件处理函数
  goclick: function (e) {
    let data = e.currentTarget.dataset.item,
      type = data.type;
    switch (type) {
      case 1:
        wx.navigateTo({
          url: '../partybuilding/partybuilding?name=' + data.name
        })
        break
      case 2:
        wx.navigateTo({
          url: '../index/HomeStoryInformation?name=' + data.name
        })
        break
      case 3:
        wx.navigateTo({
          url: '../index/HomeNewsInformation?name=' + data.name + '&type=1'
        })
        break
      case 4:
        wx.navigateTo({
          url: '../index/HomeConvenientService?name=' + data.name
        })
        break
      case 5:
        wx.navigateTo({
          url: '../index/HomeAgriculturalProduct?name=' + data.name + '&type=8'
        })
        break
      case 6:
        wx.navigateTo({
          url: '../index/HomeNewsInformation?name=' + data.name + '&type=3'
        })
        break
    }
  },

  /**
   * 更多资讯
   * @param {} params 
   */
  newMoreClick: function (params) {
    wx.navigateTo({
      url: '../index/HomeNewsInformation?name=' + '新闻资讯'+ '&type=1'
    })
  },

  /**
   * 查看内容
   * @param {} params 
   */
  newItemClick: function (e) {
    let data = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../partybuilding/dynamicDetail?name=' + data.title + '&content=' + data.content + '&id=' + data.id
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
    wx.setStorageSync('swiperH', this.data.Hei)
  },
  /**
   * 轮播图
   * @param {}} e 
   */
  swiperChange(e) {
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
   * 是否登录
   */
  loginJundge: function () {
    wx.showModal({
      title: '提示',
      content: '你还未登录，请先登录！',
      success(res) {
        if (res.confirm) {}
      }
    })
  },

  /**
   * 是否有权限
   */
  accountAuth: function () {
    wx.showModal({
      title: '提示',
      content: '你账号没有权限,请登录后台配置权限',
      success(res) {
        if (res.confirm) {}
      }
    })
  },

  onLoad: function () {
    this.getAdvData();
    this.getHorseRaceLampData();
    this.getDynamicInformationData();
  },

  //获取Banner广告
  getAdvData() {
    var that = this;
    var prams = {
      type: 2
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
      type: 2
    }
    http.getRequest(app.data.baseUrl + "spb/getHorseRaceLamp", prams,
      function (res) {
        that.setData({
          news: res.data
        })
      },
      function (err) {})
  },

  //获取新闻资讯信息
  getDynamicInformationData() {
    var that = this;
    var prams = {
      type: 1
    }
    http.getRequest(app.data.baseUrl + "spb/getDynamicInformation", prams,
      function (res) {
        that.setData({
          dynamicInformation: res.data
        })
      },
      function (err) {})
  },

  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },

  onShow: function () {
    if (app.data.openId) {
      this.getUserInfo();
    }
  },
  /**
   * 绑定微信
   */
  getUserInfo: function () {
    var prams = {
      openId: app.data.openId
    }
    http.httpPostRequest(app.data.baseUrl + "user/wx_auth", prams,
      function (res) {
        if (res.data && res.data.roles) {
          wx.setStorageSync('roleId', res.data.roles[0].roleId)
        }
      },
      function (err) {})
  }
})