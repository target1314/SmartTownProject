// pages/me/me.js
const app = getApp()
var http = require('../../utils/httputils.js'); //相对路径
Page({
  data: {
    customerTelephone: '0913-3781005',
    userInfo: {},
    nickName: '',
    roleName: '普通用户',
    phone: '',
    openId: '',
    showAuth: wx.getStorageSync('showAuth'),
    chunnelDefault: [{
        name: '精准扶贫',
        type: 1,
        image: '/image/home/fuping.png'
      },
      {
        name: '土地流转',
        type: 2,
        image: '/image/home/tudi.png'
      },
      {
        name: '水产养殖',
        type: 3,
        image: '/image/home/shuichan.png'
      },
      {
        name: '疫情防控',
        type: 4,
        image: '/image/home/yiqing.png'
      },
      {
        name: '数据登记',
        type: 5,
        image: '/image/home/shujudengji.png'
      }
    ]
  },

  //事件处理函数
  goclick: function (e) {
    if (wx.getStorageSync('openId')) {
      if (wx.getStorageSync('roleId') == '4') {
        this.accountAuth();
        return false
      }
    } else {
      this.loginJundge();
      return false
    }
    let data = e.currentTarget.dataset.item,
      type = data.type;
    switch (type) {
      case 1:
        wx.navigateTo({
          url: '../targetedpovertyalleviation/targetedpovertyalleviation?name=' + data.name
        })
        break
      case 2:
        wx.navigateTo({
          url: '../landcirculation/landcirculation?name=' + data.name
        })
        break
      case 3:
        wx.navigateTo({
          url: '../aquaculture/addAquaculture?name=' + data.name
        })
        break
      case 4:
        wx.navigateTo({
          url: '../epidemicprevention/epidemicprevention?name=' + data.name
        })
        break
      case 5:
        wx.navigateTo({
          url: '../informationregistration/informationregistration?name=' + data.name
        })
        break
    }
  },

  /**
   * 微信授权登录
   * @param {} e 
   */
  auth: function (e) {
    this.wxSetting();
  },

  //绑定手机
  bindphone: function () {
    if (wx.getStorageSync('openId')) {
      wx.navigateTo({
        url: '../bindphone/bindphone'
      })
    } else {
      this.loginJundge();
    }
  },
  //退出账号
  quitbtn: function () {
    var that = this;
    if (wx.getStorageSync('openId')) {
      wx.showModal({
        title: '提示',
        content: '确定要退出当前账号吗?',
        success(res) {
          if (res.confirm) {
            that.setData({
              showAuth: true,
              phone: '绑定手机号'
            })
            wx.setStorageSync('openId', '')
            wx.setStorageSync('showAuth', true)
          }
        }
      })
    } else {
      this.loginJundge();
    }
  },
  /**
   * 我的点赞
   */
  bindFabulous: function () {
    if (wx.getStorageSync('openId')) {
      wx.navigateTo({
        url: '../me/fabulous'
      })
    } else {
      this.loginJundge();
    }
  },
  /**
   * 学习记录
   */
  bindStudy: function () {
    if (wx.getStorageSync('openId')) {
      wx.navigateTo({
        url: '../me/studyHistory'
      })
    } else {
      this.loginJundge();
    }
  },
  /**
   * 我的反馈
   */
  feedback: function () {
    if (wx.getStorageSync('openId')) {
      wx.navigateTo({
        url: '../me/myFeedBack'
      })
    } else {
      this.loginJundge();
    }
  },

  /**
   * 是否登录
   */
  loginJundge: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '你还未登录，请先登录！',
      success(res) {
        if (res.confirm) {
          that.wxSetting();
        }
      }
    })
  },

  /**
   * 是否有权限
   */
  accountAuth: function () {
    wx.showModal({
      title: '提示',
      content: '你没有权限查看',
      success(res) {
        if (res.confirm) {}
      }
    })
  },
  /**
   * 拨打电话
   */
  bindCallPhone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.customerTelephone,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.openid) {
      this.bindWxAuth();
    } 
    if (wx.getStorageSync('phone')) {
      this.setData({
        phone: wx.getStorageSync('phone')
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.wxSetting();
  },

  /**
   * 微信授权
   */
  wxSetting() {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.login();
        } else {
          //用户没有授权
          that.setData({
            showAuth: true
          })
        }
      }
    });
  },
  /**
   * 登录获取Code
   */
  login: function () {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          // 必须是在用户已经授权的情况下调用
          var prams = {
            appid: app.data.appId,
            secret: app.data.appSecret,
            js_code: res.code
          }
          http.postRequest(app.data.baseUrl + "sys/wxAuth", prams,
            function (res) {
              var itemData = JSON.parse(res.data);
              wx.setStorageSync('openId', itemData.openid)
              that.setData({
                openId: itemData.openid,
              })
              wx.getUserInfo({
                success: function (res) {
                  wx.setStorageSync('showAuth', false)
                  wx.setStorageSync('nickName', res.userInfo.nickName)
                  that.setData({
                    nickName: res.userInfo.nickName,
                    userInfo: res.userInfo,
                    showAuth: false
                  })
                  that.bindWxAuth();
                  that.getAccessToken();
                }
              })
            },
            function (err) {
              wx.showToast({
                title: '登录失败,请重试',
                icon: 'none'
              })
              that.setData({
                showAuth: true
              })
            })
        } else {
          wx.showToast({
            title: '登录失败,请重试',
            icon: 'none'
          })
          that.setData({
            showAuth: true
          })
        }
      },
      fail: function (error) {
        wx.showToast({
          title: '登录失败,请重试',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 获取AccessToken
   */
  getAccessToken() {
    var prams = {
      appid: app.data.appId,
      secret: app.data.appSecret,
    }
    http.postRequest(app.data.baseUrl + "sys/getAccessToken", prams,
      function (res) {
        var itemData = JSON.parse(res.data);
        wx.setStorageSync('access_token', itemData.access_token)
      },
      function (err) {})
  },
  /**
   * 绑定微信
   */
  bindWxAuth: function () {
    var that = this;
    var prams = {
      nickName: this.data.nickName,
      openId: this.data.openId
    }
    http.httpPostRequest(app.data.baseUrl + "user/wx_auth", prams,
      function (res) {
        if (res.data && res.data.roles) {
          that.setData({
            phone: res.data.phone == '' ? '绑定手机号' : res.data.phone,
            roleName: res.data.roles[0].roleName
          })
          wx.setStorageSync('userId', res.data.userId)
          wx.setStorageSync('roleId', res.data.roles[0].roleId)
          that.getAvatar();
        } else {
          that.setData({
            roleName: '普通用户'
          })
        }
      },
      function (err) {})
  },

  /**
   * 获取微信头像
   */
  getAvatar() {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo;
        wx.setStorageSync('bgPic', res.userInfo.avatarUrl)
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
})