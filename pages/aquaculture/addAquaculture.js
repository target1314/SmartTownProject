// pages/aquaculture/addAquaculture.js
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    manage: '',
    breedingSpecies: '',
    phone: '',
    tradingVolume: '',
    turnover: ''
  },

  //名称
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //养殖种类
  varietiesjInput: function (e) {
    this.setData({
      breedingSpecies: e.detail.value
    })
  },
  //管理者
  manageInput: function (e) {
    this.setData({
      manage: e.detail.value
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
    let name = this.data.name
    let manage = this.data.manage
    let phone = this.data.phone
    let breedingSpecies = this.data.breedingSpecies
    let tradingVolume = this.data.tradingVolume
    let turnover = this.data.turnover
    if (name == '') {
      wx.showToast({
        title: '请输入名称',
        icon: 'none'
      })
      return false
    }else if (manage == '') {
      wx.showToast({
        title: '请输入管理者',
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
    } else if (breedingSpecies == '') {
      wx.showToast({
        title: '请输入养殖种类',
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
      this.addAquacultureData();
    }
  },

  //添加水产养殖
  addAquacultureData() {
    var that = this;
    var prams = {
      manage: that.data.manage,
      name: that.data.name,
      phone: that.data.phone,
      breedingSpecies: that.data.breedingSpecies,
      tradingVolume: that.data.tradingVolume,
      turnover: that.data.turnover,
      type: 1,
    }
    http.postRequest(app.data.baseUrl + "breed", prams,
      function (res) {
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