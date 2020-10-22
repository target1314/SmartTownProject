// pages/index/HomeConvenientService.js
const app = getApp()
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    type: '',
    typeName: '',
    content: '',
    typeItem: [],
    userId: wx.getStorageSync('userId')
  },
  /**
   * 姓名
   * @param {} e 
   */
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  /**
   * 电话
   * @param {} e 
   */
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  /**
   * 类型
   * @param {} e 
   */
  typeItem: function (e) {
    var that = this;
    //异常状态分类
    wx: wx.showActionSheet({
      itemList: that.data.typeItem,
      itemColor: '',
      success: function (res) {
        if (!res.cancel) {
          var itemType = res.tapIndex + 1;
          if (res.tapIndex == 0) {
            that.setData({
              type: itemType,
              typeName: that.data.typeItem[res.tapIndex]
            })
          } else if (res.tapIndex == 1) {
            that.setData({
              type: itemType,
              typeName: that.data.typeItem[res.tapIndex]
            })
          } else if (res.tapIndex == 2) {
            that.setData({
              type: itemType,
              typeName: that.data.typeItem[res.tapIndex]
            })
          } else if (res.tapIndex == 3) {
            that.setData({
              type: itemType,
              typeName: that.data.typeItem[res.tapIndex]
            })
          } else if (res.tapIndex == 4) {
            that.setData({
              type: itemType,
              typeName: that.data.typeItem[res.tapIndex]
            })
          }
        }
      },
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  /**
   * 内容
   * @param {} e 
   */
  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  /**
   * 发布
   * @param {*} e 
   */
  addConService: function (e) {
    let name = this.data.name
    let phone = this.data.phone
    let typeName = this.data.typeName
    let content = this.data.content
    if (name == '') {
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
    } else if (typeName == '') {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
    } else if (content == '') {
      wx.showToast({
        title: '请输入内容描述',
        icon: 'none'
      })
      return false
    } else {
      this.addConServicesData();
    }
  },

  //查询便民服务所有类型
  getAllAppealTypeData() {
    var that = this;
    var prams = {}
    http.getRequest(app.data.baseUrl + "getAllAppealType", prams,
      function (res) {
        var param = {};
        for (var index in res.data) {
          var string = "typeItem[" + index + "]";
          param[string] = res.data[index].type;
          that.setData(param);
        }
        that.setData({
          typeItem: that.data.typeItem
        })
      },
      function (err) {

      })
  },

  //添加便民服务
  addConServicesData() {
    var that = this;
    var prams = {
      name: that.data.name,
      phone: that.data.phone,
      type: that.data.type,
      typeName: that.data.typeName,
      state: 1,
      isDelete: 2,
      content: that.data.content,
      userId: this.data.userId
    }
    http.httpPostRequest(app.data.baseUrl + "addConvenientService", prams,
      function (res) {
        wx.setStorageSync('isSuc', true)
        wx.showToast({
            title: '提交成功，我们会尽快解决您的相关问题！',
            icon: 'none',
            duration: 3000,
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
      title: '便民服务',
    })
    this.getAllAppealTypeData();
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