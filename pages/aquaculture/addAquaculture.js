// pages/aquaculture/addAquaculture.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    varietiesName: '',
    name: '',
    phone: '',
    tradingVolume: '',
    turnover: ''
  },

  //品种
  varietiesjInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //姓名
  nameInput: function (e) {
    this.setData({
      varietiesName: e.detail.value
    })
  },
  //联系电话
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //交易量
  tradingVolumeInput: function (e) {
    this.setData({
      tradingVolume: e.detail.value
    })
  },
  //交易量
  turnoverInput: function (e) {
    this.setData({
      turnover: e.detail.value
    })
  },

  //提交
  primary: function () {
    let varietiesName = this.data.varietiesName
    let name = this.data.name
    let phone = this.data.phone
    let tradingVolume = this.data.tradingVolume
    let turnover = this.data.turnover
    if (varietiesName == '') {
      wx.showToast({
        title: '请输入品种',
        icon: 'none'
      })
      return false
    } else if (name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    } else if (phone == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return false
    } else if (tradingVolume == '') {
      wx.showToast({
        title: '请输入交易量',
        icon: 'none'
      })
      return false
    } else if (turnover == '') {
      wx.showToast({
        title: '请输入交易额',
        icon: 'none'
      })
      return false
    } else {
      wx.showToast({
        title: '提交数据'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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