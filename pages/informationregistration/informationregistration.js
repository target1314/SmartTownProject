// pages/informationregistration/informationregistration.js
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['贫困', '大棚', '山体', '景区'],
    currentTab: 0,
    //贫困
    userName: '',
    villageGroupName: '',
    idCardNumber: '',
    yieldCount: '',
    contactPhone: '',

    //大棚
    greenHouseManage: '',
    greenHouseAddress: '',
    greenHouseName: '',
    greenCategroryName: '',

    //山体
    landslideAddress: '',
    landslidePerson: '',
    landslidePhone: '',

    //景区
    scenicSpotName: '',
    scenicSpotAddress: '',
    scenicSpotPrson: '',
    scenicSpotPhone: '',
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
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
  //身份证
  idCardInput: function (e) {
    this.setData({
      idCardNumber: e.detail.value
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

  //贫困提交
  poorPrimary: function () {
    let username = this.data.userName
    let villageGroupName = this.data.villageGroupName
    let idCardNumber = this.data.idCardNumber
    let yieldCount = this.data.yieldCount
    let contactPhone = this.data.contactPhone
    if (username == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    } else if (idCardNumber == '') {
      wx.showToast({
        title: '请输入身份证',
        icon: 'none'
      })
      return false
    } else if (villageGroupName == '') {
      wx.showToast({
        title: '请输入详细地址',
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
      this.addPoorData();
    }
  },

  //添加贫困数据
  addPoorData() {
    var that = this;
    var prams = {
      name: that.data.userName,
      idCard: that.data.idCardNumber,
      village: that.data.villageGroupName,
      outputValue: that.data.yieldCount,
      phone: that.data.contactPhone
    }
    http.postRequest(app.data.baseUrl + "poor", prams,
      function (res) {
        wx.showToast({
            title: '添加成功',
            icon: 'success'
          }),
          setTimeout(function () {
            that.setData({
              userName: '',
              idCardNumber: '',
              villageGroupName: '',
              yieldCount: '',
              contactPhone: '',
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

  //管理员
  greenHouseManageInput: function (e) {
    this.setData({
      greenHouseManage: e.detail.value
    })
  },
  //地址
  greenHouseCategoryInput: function (e) {
    this.setData({
      greenHouseAddress: e.detail.value
    })
  },
  //大棚名称
  greenHouseNameInput: function (e) {
    this.setData({
      greenHouseName: e.detail.value
    })
  },
  //大棚种类
  greenCategroryInput: function (e) {
    this.setData({
      greenCategroryName: e.detail.value
    })
  },

  //大棚提交
  greenHousePrimary: function () {
    let greenHouseManage = this.data.greenHouseManage
    let greenHouseAddress = this.data.greenHouseAddress
    let greenHouseName = this.data.greenHouseName
    let greenHouseCategrory = this.data.greenCategroryName
    if (greenHouseName == '') {
      wx.showToast({
        title: '请输入大棚名称',
        icon: 'none'
      })
      return false
    } else if (greenHouseCategrory == '') {
      wx.showToast({
        title: '请输入种类',
        icon: 'none'
      })
      return false
    } else if (greenHouseAddress == '') {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      return false
    } else if (greenHouseManage == '') {
      wx.showToast({
        title: '请输入管理者姓名',
        icon: 'none'
      })
      return false
    } else {
      this.addgreenHouseData();
    }
  },

  //添加大棚数据
  addgreenHouseData() {
    var that = this;
    var prams = {
      manage: that.data.greenHouseManage,
      name: that.data.greenHouseName,
      address: that.data.greenHouseAddress,
      type: that.data.greenCategroryName
    }
    http.postRequest(app.data.baseUrl + "greenhouse", prams,
      function (res) {
        wx.showToast({
            title: '添加成功',
            icon: 'success'
          }),
          setTimeout(function () {
            that.setData({
              greenHouseManage: '',
              greenHousePhone: '',
              greenHouseCategory: '',
              greenHouseName: '',
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
  //地址
  landslideAddressInput: function (e) {
    this.setData({
      landslideAddress: e.detail.value
    })
  },

  //负责人
  landslidePersonInput: function (e) {
    this.setData({
      landslidePerson: e.detail.value
    })
  },

  //电话
  landslidePhoneInput: function (e) {
    this.setData({
      landslidePhone: e.detail.value
    })
  },
  //山体提交
  landslidePrimary: function () {
    let landslideAddress = this.data.landslideAddress
    let landslidePerson = this.data.landslidePerson
    let landslidePhone = this.data.landslidePhone
    if (landslideAddress == '') {
      wx.showToast({
        title: '请输入地址',
        icon: 'none'
      })
      return false
    } else if (landslidePerson == '') {
      wx.showToast({
        title: '请输入负责人',
        icon: 'none'
      })
      return false
    } else if (landslidePhone == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return false
    } else {
      this.addlandslideData();
    }
  },

  //添加山体数据
  addlandslideData() {
    var that = this;
    var prams = {
      address: that.data.landslideAddress,
      personCharge: that.data.landslidePerson,
      phone: that.data.landslidePhone
    }
    http.postRequest(app.data.baseUrl + "landslide", prams,
      function (res) {
        wx.showToast({
            title: '添加成功',
            icon: 'success'
          }),
          setTimeout(function () {
            that.setData({
              landslideAddress: '',
              landslidePerson: '',
              landslidePhone: '',
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
  //景点名称
  scenicSpotNameInput: function (e) {
    this.setData({
      scenicSpotName: e.detail.value
    })
  },
  //地址
  scenicSpotAddressInput: function (e) {
    this.setData({
      scenicSpotAddress: e.detail.value
    })
  },
  //负责人
  scenicSpotPrsonInput: function (e) {
    this.setData({
      scenicSpotPrson: e.detail.value
    })
  },
  //电话
  scenicSpotPhoneInput: function (e) {
    this.setData({
      scenicSpotPhone: e.detail.value
    })
  },
  //景区提交
  scenicSpotPrimary: function () {
    let scenicSpotName = this.data.scenicSpotName
    let scenicSpotAddress = this.data.scenicSpotAddress
    let scenicSpotPrson = this.data.scenicSpotPrson
    let scenicSpotPhone = this.data.scenicSpotPhone
    if (scenicSpotName == '') {
      wx.showToast({
        title: '请输入景点名称',
        icon: 'none'
      })
      return false
    } else if (scenicSpotAddress == '') {
      wx.showToast({
        title: '请输入景点地址',
        icon: 'none'
      })
      return false
    } else if (scenicSpotPrson == '') {
      wx.showToast({
        title: '请输入负责人',
        icon: 'none'
      })
      return false
    } else if (scenicSpotPhone == '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return false
    } else {
      this.addscenicSpotData();
    }
  },

  //添加景区数据
  addscenicSpotData() {
    var that = this;
    var prams = {
      address: that.data.scenicSpotAddress,
      personCharge: that.data.scenicSpotPrson,
      personPhone: that.data.scenicSpotPhone,
      scenicspotName: that.data.scenicSpotName
    }
    http.postRequest(app.data.baseUrl + "scenicSpot", prams,
      function (res) {
        wx.showToast({
            title: '添加成功',
            icon: 'success'
          }),
          setTimeout(function () {
            that.setData({
              scenicSpotName: '',
              scenicSpotAddress: '',
              scenicSpotPrson: '',
              scenicSpotPhone: '',
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