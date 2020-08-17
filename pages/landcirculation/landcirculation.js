// pages/landcirculation/landcirculation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    outflowSideName:'',
    inflowSideName:'',
    landLocationAddress:'',
    landAreaName:'',
    landTermName:'',
  },

  //流出方
  outflowSideInput:function(e){
    this.setData({
      outflowSideName: e.detail.value
    })
  },
  //流入方
  inflowSideInput:function(e){
    this.setData({
      outflowSideName: e.detail.value
    })
  },
  //流转土地位置
  landLocationInput:function(e){
    this.setData({
      outflowSideName: e.detail.value
    })
  },
  //流转土地面积/用途
  landAreaInput:function(e){
    this.setData({
      outflowSideName: e.detail.value
    })
  },
  //土地承包经营权流转期限
  landTermInput:function(e){
    this.setData({
      outflowSideName: e.detail.value
    })
  },
   //提交
   primary: function () {
    let outflowSideName = this.data.outflowSideName
    let inflowSideName = this.data.inflowSideName
    let landLocationAddress = this.data.landLocationAddress
    let landAreaName = this.data.landAreaName
    let landTermName = this.data.landTermName
    if (outflowSideName == '') {
      wx.showToast({
        title: '请输入流出方',
        icon: 'none'
      })
      return false
    } else if (inflowSideName == '') {
      wx.showToast({
        title: '请输入流入方',
        icon: 'none'
      })
      return false
    } else if (landLocationAddress == '') {
      wx.showToast({
        title: '请输入流转土地位置',
        icon: 'none'
      })
      return false
    } else if (landAreaName == '') {
      wx.showToast({
        title: '请输入流转土地面积/用途',
        icon: 'none'
      })
      return false
    } else if (landTermName == '') {
      wx.showToast({
        title: '请输土地承包经营权流转期限量',
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
    wx.setNavigationBarTitle({ title: options.name })  
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