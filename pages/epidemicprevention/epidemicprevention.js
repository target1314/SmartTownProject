// pages/epidemicprevention/epidemicprevention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: [{
      id: 1,
      value: '男',
      checked: true
    }, {
      id: 2,
      value: '女',
      checked: false
    }],

    abnormalstate: [{
      id: 1,
      value: '是',
      checked: false
    }, {
      id: 2,
      value: '否',
      checked: true
    }],
    name: '',
    card: '',
    phone: '',
    address: '',
    sexType: 1,
    bodyType: 2,
  },

  //姓名
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //身份证
  cardInput: function (e) {
    this.setData({
      card: e.detail.value
    })
  },
  //联系电话
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //联系电话
  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  //提交
  primary: function () {
    let name = this.data.name
    let card = this.data.card
    let phone = this.data.phone
    let address = this.data.address
    if (name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    } else if (card == '') {
      wx.showToast({
        title: '请输入证件号码',
        icon: 'none'
      })
      return false
    } else if (phone == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return false
    } else if (address == '') {
      wx.showToast({
        title: '请输入详情地址',
        icon: 'none'
      })
      return false
    } else {
      wx.showToast({
        title: '提交数据'
      })
    }
  },

  // 性别
  radioChangeFirst: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sex = this.data.sex
    console.log(e.detail.value);
    console.log(sex);
    var type = parseInt(e.detail.value);
    this.setData({
      sexType: type
    })
  },
  //是否身体状态
  radioChangeSecond: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    const sex = this.data.abnormalstate
    console.log(e.detail.value);
    console.log(sex);
    var type = parseInt(e.detail.value);
    this.setData({
      bodyType: type
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