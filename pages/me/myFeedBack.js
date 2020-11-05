// pages/me/myFeedBack.js
//获取应用实例
const app = getApp();
var http = require('../../utils/httputils.js'); //相对路径
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['正在处理中', '已解决'],
    currentTab: 0,
    handeleConvenientService: '',
    resolvedConvenientService: '',
    showModal: false,
    returnContent: '',
    index: '',
    userId: wx.getStorageSync('userId'),
    roleId: wx.getStorageSync('roleId'), //用户权限id
    isShow: false,
    isHandelNoData: true,
    isResolvedNoData: true,
  },

  /**
   * Tab点击
   * @param {} e 
   */
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 回复内容
   * @param {*} params 
   */
  inputChange: function (e) {
    this.setData({
      returnContent: e.detail.value
    })
  },
  /**
   * 回复
   * @param {*} params 
   */
  commentBtn: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      index: index,
      showModal: true
    })
  },

  /**
   * 完成
   */
  completeBtn: function (e) {
    var index = e.currentTarget.dataset.index;
    var itemList = this.data.handeleConvenientService;
    var that = this;
    that.setData({
      index: index
    })
    that.updateCompleteConvenientServiceData(that.data.handeleConvenientService[that.data.index].returnContent, that.data.handeleConvenientService[that.data.index].bmId, 2, itemList, index);
  },

  /**
   * 删除
   * @param {*} params 
   */
  delBtn: function (e) {
    var that = this;
    let data = e.currentTarget.dataset;
    var itemList = this.data.resolvedConvenientService;
    var index = data.index;
    wx.showModal({
      title: '提示',
      content: '你确定删除吗？',
      success(res) {
        if (res.confirm) {
          that.delConvenientServiceData(1, itemList, index, data.state)
        }
      }
    })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that = this
    var returnContent = this.data.returnContent
    if (returnContent == '') {
      wx.showToast({
        title: '请输入回复内容',
        icon: 'none'
      })
    } else {
      this.hideModal();
      var changeContent = "handeleConvenientService[" + that.data.index + "].returnContent";
      this.setData({
        [changeContent]: returnContent
      });
      var changeFinishTime = "handeleConvenientService[" + that.data.index + "].finishTime";
      var dateTime = new Date();
      // 年、月、日用字符串“-”拼接
      var thisDate = dateTime.getFullYear() + "-" + (dateTime.getMonth() + 1) + "-" + dateTime.getDate() + ' ' + dateTime.getHours() + ':' + dateTime.getMinutes() + ':' + dateTime.getSeconds();
      this.setData({
        [changeFinishTime]: thisDate
      });
      that.updateConvenientServiceData(returnContent, that.data.handeleConvenientService[that.data.index].bmId)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的反馈',
    })
    this.getHandelConvenientServiceData();
    this.getResolvedConvenientServiceData();
  },

  //获取便民服务正在处理数据
  getHandelConvenientServiceData() {
    var that = this;
    var prams = {
      userId: that.data.userId,
      state: 1,
      isDelete: 2,
    }
    http.getRequest(app.data.baseUrl + "getConvenientServiceList", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            handeleConvenientService: res.data,
            isHandelNoData: true
          })
        } else {
          that.setData({
            isHandelNoData: false
          })
        }
      },
      function (err) {
        that.setData({
          isHandelNoData: false
        })
      })
  },

  //获取便民服务已解决数据
  getResolvedConvenientServiceData() {
    var that = this;
    var prams = {
      userId: that.data.userId,
      state: 2,
      isDelete: 2,
    }
    http.httpGetRequest(app.data.baseUrl + "getConvenientServiceList", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            resolvedConvenientService: res.data,
            isResolvedNoData: true
          })
        } else {
          that.setData({
            isResolvedNoData: false
          })
        }
      },
      function (err) {
        that.setData({
          isResolvedNoData: false
        })
      })
  },

  /**
   * 完成
   * @param {*} returnContent 
   * @param {*} isDelete 
   * @param {*} bmId 
   * @param {*} state 
   */
  updateCompleteConvenientServiceData(returnContent, bmId, state, itemList, index) {
    var that = this;
    var prams = {
      returnContent: returnContent,
      bmId: bmId,
      state: state,
    }
    http.httpPutRequest(app.data.baseUrl + "updateConvenientService", prams,
      function (res) {
        var changeState = "handeleConvenientService[" + that.data.index + "].state";
        that.setData({
          [changeState]: 2
        });
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 1000,
        })
        itemList.splice(index, 1)
        that.setData({
          handeleConvenientService: itemList,
        })
        if (that.data.handeleConvenientService.length > 0) {
          that.setData({
            isHandelNoData: true
          })
        } else {
          that.setData({
            isHandelNoData: false
          })
        }
      },
      function (err) {})
  },
  /**
   * 回复意见
   * @param {*} returnContent 
   * @param {*} isDelete 
   * @param {*} bmId 
   * @param {*} state 
   */
  updateConvenientServiceData(returnContent, bmId) {
    var that = this;
    var prams = {
      returnContent: returnContent,
      bmId: bmId
    }
    http.httpPutRequest(app.data.baseUrl + "updateConvenientService", prams,
      function (res) {
        wx.showToast({
          title: '回复成功',
          icon: 'none',
          duration: 1000,
        })
      },
      function (err) {})
  },

  /**
   * 删除意见
   * @param {*} returnContent 
   * @param {*} isDelete 
   * @param {*} bmId 
   * @param {*} state 
   */
  delConvenientServiceData(isDelete, itemList, index, state) {
    var that = this;
    var prams = {
      isDelete: isDelete,
      bmId: itemList[index].bmId,
      state: state,
    }
    http.httpPutRequest(app.data.baseUrl + "updateConvenientService", prams,
      function (res) {
        itemList.splice(index, 1)
        that.setData({
          resolvedConvenientService: itemList,
        })
        if (that.data.resolvedConvenientService.length > 0) {
          that.setData({
            isResolvedNoData: true
          })
        } else {
          that.setData({
            isResolvedNoData: false
          })
        }
      },
      function (err) {
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 1000,
        })
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
    if (wx.getStorageSync('roleId') == 4) {
      this.setData({
        isShow: false
      })
    } else if (this.data.roleId == 1) {
      this.setData({
        isShow: true
      })
    }
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
    if (this.data.currentTab == 0) {
      this.getHandelConvenientServiceData();
    } else {
      this.getResolvedConvenientServiceData();
    }
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