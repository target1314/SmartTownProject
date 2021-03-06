// pages/partybuilding/partybuilding.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596115927591&di=a0f11247f4352d5eaf638d1a6475778d&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596115927591&di=a0f11247f4352d5eaf638d1a6475778d&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596115927591&di=a0f11247f4352d5eaf638d1a6475778d&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg'
    ],
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    chunnelDefault: [{
        name: '动态',
        type: '1',
        image: '/image/home/dongtai.png'
      },
      {
        name: '学习',
        type: '2',
        image: '/image/home/xuexi.png'
      }, {
        name: '教育',
        type: '3',
        image: '/image/home/jiaoyu.png'
      },
      {
        name: '互动',
        type: '4',
        image: '/image/home/hudong.png'
      },
    ],
    navbar: ['最新讯息', '学习课程', '最新活动', '志愿服务'],
    currentTab: 0,
    news: [
      '平安夜，百人祝福领取苹果~',
      '寒流来袭，你的秋裤准备好了吗？',
      '快收下，新鲜出炉冬季实用穿搭指南~'
    ],
    autoplay: true,
    interval: 2000,
    duration: 1000,

  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
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