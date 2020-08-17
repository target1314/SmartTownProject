// pages/targetedpovertyalleviation/addTargetedpovertyalleviation.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentAddress: '',
    helpObjName: '',
    helpCompanyName: '',
    helpName: '',
    helpTime: '',
    helpCount: '',
    isLocationData: false
  },

  //帮扶对象
  helpObjInput: function (e) {
    this.setData({
      helpObjName: e.detail.value
    })
  },
  //帮扶单位
  helpCompanyInput: function (e) {
    this.setData({
      helpCompanyName: e.detail.value
    })
  },
  //帮扶人
  helpNameInput: function (e) {
    this.setData({
      helpName: e.detail.value
    })
  },
  //帮扶时间
  helpTimeInput: function (e) {
    this.setData({
      helpTime: e.detail.value
    })
  },
  //帮扶数量
  helpCountInput: function (e) {
    this.setData({
      helpCount: e.detail.value
    })
  },

  //提交
  primary: function () {
    let helpObjName = this.data.helpObjName
    let helpCompanyName = this.data.helpCompanyName
    let helpName = this.data.helpName
    let helpTime = this.data.helpTime
    let helpCount = this.data.helpCount
    if (helpObjName == '') {
      wx.showToast({
        title: '请输入帮扶对象',
        icon: 'none'
      })
      return false
    } else if (helpCompanyName == '') {
      wx.showToast({
        title: '请输入帮扶单位',
        icon: 'none'
      })
      return false
    } else if (helpName == '') {
      wx.showToast({
        title: '请输入帮扶人',
        icon: 'none'
      })
      return false
    } else if (helpTime == '') {
      wx.showToast({
        title: '请输入帮扶时间',
        icon: 'none'
      })
      return false
    } else if (helpCount == '') {
      wx.showToast({
        title: '请输入帮扶数量',
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
      title: "帮扶对象"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //获取当前位置经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("获取当前经纬度：" + JSON.stringify(res));
        //发送请求通过经纬度反查地址信息  
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            location: res.latitude + "," + res.longitude,
            key: 'S7ZBZ-ZQ7WX-GVT4B-ZMUT5-V2NC2-VMBWQ',
            get_poi: '1'
          },
          method: 'GET',
          success: function (res) {
            // success
            that.setData({
              currentAddress: res.data.result.address,
              isLocationData: true
            })
            console.log(res.data.result.address)
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    })
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