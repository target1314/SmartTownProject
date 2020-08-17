// pages/informationregistration/informationregistration.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    villageGroupName: '',
    productCategoryName: '',
    yieldCount: '',
    contactPhone: ''
  },

  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  //村组（详细到门牌）
  villageGroupInput: function (e) {
    this.setData({
      villageGroupName: e.detail.value
    })
  },
  //农产品类目
  productCategoryInput: function (e) {
    this.setData({
      productCategoryName: e.detail.value
    })
  },
  //产量
  yieldInput: function (e) {
    this.setData({
      yieldCount: e.detail.value
    })
  },
  //联系电话
  contactPhoneInput: function (e) {
    this.setData({
      contactPhone: e.detail.value
    })
  },

  //提交
  primary: function () {
    let username = this.data.userName
    let villageGroupName = this.data.villageGroupName
    let productCategoryName = this.data.productCategoryName
    let yieldCount = this.data.yieldCount
    let contactPhone = this.data.contactPhone
    if (username == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    } else if (villageGroupName == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      return false
    } else if (productCategoryName == '') {
      wx.showToast({
        title: '请输入产品分类',
        icon: 'none'
      })
      return false
    } else if (yieldCount == '') {
      wx.showToast({
        title: '请输入产量',
        icon: 'none'
      })
      return false
    } else if (contactPhone == '') {
      wx.showToast({
        title: '请输入手机号',
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