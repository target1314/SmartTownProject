// pages/partybuilding/study.js
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
    newMessage: [{
        name: '守正创新 总书记这样为媒体融合发展把舵定向',
        type: '1',
        image: 'https://p1-tt.byteimg.com/origin/pgc-image/S7fR6Jm9WKNCUU?from=pc'
      },
      {
        name: '个人房贷利率转换倒计时：到底该咋选？',
        type: '2',
        image: 'https://p1-tt.byteimg.com/origin/pgc-image/S7fR6Jm9WKNCUU?from=pc'
      }, {
        name: '没有一份工作是不委屈的，熬过去',
        type: '3',
        image: 'https://p1-tt.byteimg.com/origin/pgc-image/S7fR6Jm9WKNCUU?from=pc'
      },
      {
        name: '租房蟑螂太多，还往身上爬，房东：这么点事，下点药好了',
        type: '4',
        image: 'https://p1-tt.byteimg.com/origin/pgc-image/S7fR6Jm9WKNCUU?from=pc'
      },
    ]
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