// pages/targetedpovertyalleviation/addTargetedpovertyalleviation.js
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentAddress: '',
    helpObjName: '',
    helpProject: '',
    helpCompanyName: '',
    helpName: '',
    helpTime: '',
    poorYear: '',
    isLocationData: false,
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
    isShow: false,
    disabled: false,
    poorState: 1, //状态
    helppoorState: '' //状态
  },

  //帮扶项目
  helpProjectInput: function (e) {
    this.setData({
      helpProject: e.detail.value
    })
  },
  //帮扶对象
  helpObjInput: function (e) {
    this.setData({
      helpObjName: e.detail.value
    })
  },
  //所属村
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
      isShow: true,
      disabled: true,
      helpTime: e.detail.value
    })
    this.setNowDate();
  },
  //贫困年度
  poorYearInput: function (e) {
    this.setData({
      poorYear: e.detail.value
    })
  },

  //提交
  primary: function () {
    let helpProjectName = this.data.helpProject
    let helpObjName = this.data.helpObjName
    let helpCompanyName = this.data.helpCompanyName
    let helppoorState = this.data.helppoorState
    let helpName = this.data.helpName
  /*   let helpTime = this.data.helpTime */
    let poorYear = this.data.poorYear
    if (helpObjName == '') {
      wx.showToast({
        title: '请输入帮扶对象',
        icon: 'none'
      })
      return false
    } else if (helpCompanyName == '') {
      wx.showToast({
        title: '请输入帮扶村',
        icon: 'none'
      })
      return false

    } else if (helpName == '') {
      wx.showToast({
        title: '请输入负责人',
        icon: 'none'
      })
      return false
    } else if (helpProjectName == '') {
      wx.showToast({
        title: '请输入帮扶项目',
        icon: 'none'
      })
      return false
    } else if (helppoorState == '') {
      wx.showToast({
        title: '请选择贫困状态',
        icon: 'none'
      })
      return false
 /*    } else if (helpTime == '') {
      wx.showToast({
        title: '请输入帮扶时间',
        icon: 'none'
      })
      return false */
    } else if (poorYear == '') {
      wx.showToast({
        title: '请输入贫困年度',
        icon: 'none'
      })
      return false
    } else {
      this.addTargetedpovertyalleviationData();
    }
  },

  //添加精准扶贫
  addTargetedpovertyalleviationData() {
    var that = this;
    var prams = {
      helpObj: that.data.helpObjName,
      poorYear: that.data.poorYear,
      helpProject: that.data.helpProject,
      personCharge: that.data.helpName,
      village: that.data.helpCompanyName,
      poorState: that.data.poorState,
    }
    http.postRequest(app.data.baseUrl + "povertyAlleviationRecord", prams,
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

  //贫困状态
  helpPoorStateInput: function (e) {
    var that = this;
    //异常状态分类
    wx: wx.showActionSheet({
      itemList: ['已脱贫', '未脱贫'],
      itemColor: '',
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            poorState: res.tapIndex,
            helppoorState: res.tapIndex == 0 ? '已脱贫' : '未脱贫'
          })
          console.log(res.tapIndex);
        }
      },
      fail: function (res) {},
      complete: function (res) {},
    })
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
    /* wx.getLocation({
      type: 'wgs84',
      success: function (res) {
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
          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    }) */
  },
  /**
   * 日期选择
   * @param {} e 
   */
  /* dateSelectAction: function (e) {
    var cur_day = e.currentTarget.dataset.idx;
    this.setData({
      isShow: false,
      disabled: false,
      todayIndex: cur_day,
      helpTime: `${this.data.cur_year}-${this.data.cur_month}-${cur_day + 1}`
    })
  },
 */
/*   setNowDate: function () {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const todayIndex = date.getDate() - 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year: cur_year,
      cur_month: cur_month,
      weeks_ch,
      todayIndex,
    })
  },

  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  }, */
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