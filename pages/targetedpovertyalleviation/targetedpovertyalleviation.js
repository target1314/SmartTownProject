// pages/targetedpovertyalleviation/targetedpovertyalleviation.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    list: [{
        id: 1,
        cityName: '西安',
        townshipName: '范家镇',
        villageName: '范家村村委会',
        timeContent: "2020-07-29",
        subName: "Taking"
      },
      {
        id: 2,
        cityName: '西安',
        townshipName: '范家镇',
        villageName: '范家村村委会',
        timeContent: "2020-07-29",
        subName: "Taking"

      },
      {
        id: 3,
        cityName: '西安',
        townshipName: '范家镇',
        villageName: '范家村村委会',
        timeContent: "2020-07-29",
        subName: "Taking"
      },
      {
        id: 4,
        cityName: '西安',
        townshipName: '范家镇',
        villageName: '范家村村委会',
        timeContent: "2020-07-29",
        subName: "Taking"
      },
      {
        id: 5,
        cityName: '西安',
        townshipName: '范家镇',
        villageName: '范家村村委会',
        timeContent: "2020-07-29",
        subName: "Taking"
      },
      {
        id: 6,
        cityName: '西安',
        townshipName: '范家镇',
        villageName: '范家村村委会',
        timeContent: "2020-07-29",
        subName: "Taking"
      }
    ]
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

  //搜索文本
  serachInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  //搜索
  searchBtn: function () {
    let inputValue = this.data.inputValue
    if (inputValue == '') {
      wx.showToast({
        title: '请输入搜索关键字',
        icon: 'none'
      })
      return false
    } else {
      wx.showToast({
        title: '提交数据'
      })
    }
  },
  //添加数据
  addBtnCLick: function () {
    wx.navigateTo({
      url: '../targetedpovertyalleviation/addTargetedpovertyalleviation',
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