// pages/partybuilding/interaction.js
const app = getApp()
var http = require('../../utils/httputils.js'); //相对路径
Page({
  /**
   * 页面的初始数据
   */
  data: {
    interActiveList: null,
    /*定义一些数据*/
    focus: false, //输入框是否聚焦
    placeholder: '说点什么...', //底部输入框占字符
    placeholder2: '说点什么，让ta也认识看笔记的你', //顶部输入框占字符
    value: null, //顶部输入框内容
    comment_text: null, //底部评论框内容
    bbsId: null, //互动ID
    index: 0, //下标
    userId: wx.getStorageSync('userId'),
    commentCount: 0,
    giveCount: 0,
    giveType: 0, //点赞类型
    giveId: null,
    nickName: wx.getStorageSync('nickName'),
    bgPic: wx.getStorageSync('bgPic'),
    isData: true, //是否有数据
  },

  //底部输入框提交内容时触发
  confirm(e) {
    //获取输入框输入的内容
    var comment_text = e.detail.value;
    //判断用户是否输入内容为空
    if (comment_text == '') {
      //用户评论输入内容为空时弹出
      wx.showToast({
        title: '请输入内容', //提示内容
        icon: 'none' //提示图标
      })
    } else {
      var comment_list_length = this.data.interActiveList.length; //获取当前评论数组的长度
        var last_id = this.data.interActiveList[comment_list_length - 1].bbsId; //获取最后一个评论的id
      this.setData({
        bbsId: last_id,
        value: comment_text,
        index: comment_list_length - 1
      })
      this.addComment();
    }
  },

  //下面的方法可以绑定在输入框的bindblur属性上	
  blur(e) {
    const text = e.detail.value.trim();
    if (text == '') {
      this.setData({
        placeholder: "说点什么呢，万一火了呢", //占字符        
        focus: false //输入框获取焦点
      })
    }
  },

  //顶部评论框提交内容时触发  
  bindconfirm(e) {
    let data = e.currentTarget.dataset;
    var comment_text = e.detail.value;
    //判断用户是否输入内容为空   
    if (comment_text == '') {
      //用户评论输入内容为空时弹出   
      wx.showToast({
        title: '请输入内容',
        //提示内容        
        icon: 'none'
      })
    } else {
      this.setData({
        bbsId: data.bbsid,
        value: comment_text,
        index: data.index
      })
      this.addComment();
    }
  },

  /**
   * 添加评论
   */
  addComment() {
    var that = this;
    var prams = {
      bbsId: that.data.bbsId,
      content: that.data.value,
      userId: that.data.userId,
      nickName: that.data.nickName,
      avatarUrl: that.data.bgPic,
    }
    http.httpPostRequest(app.data.baseUrl + "spb/addInterActiveComment", prams,
      function (res) {
        var item = res.data;
        wx.showToast({
          title: '添加成功',
          //提示内容        
          icon: 'none'
        })
        var comment_list = that.data.interActiveList[that.data.index].comments; //获取data中的评论列表 
        var comment_detail = {} //声明一个评论/回复对象    
        comment_detail.commentId = item.commentId; //评论Id    
        comment_detail.content = item.content; //评论内容      
        comment_detail.userId = item.userId; //评论用户ID       
        comment_detail.bbsId = item.bbsId; //评论所属哪个评论id 
        comment_detail.nickName = that.data.nickName; //评论昵称
        comment_detail.avatarUrl = that.data.bgPic; //头像
        comment_detail.createTime = Date.parse(new Date()); //当前时间
        comment_list.unshift(comment_detail);
        that.setData({
          value: null, //评论内容 
          placeholder2: "说点什么，让ta也认识看笔记的你", //输入框占字符   
          //发表评论后将以下数据初始化 为下次发表评论做准备
          comment_text: null, //评论内容         
          placeholder: "说点什么...", //输入框占字符
          comment_list, //评论列表   
          interActiveList: that.data.interActiveList,
          commentCount: that.data.commentCount + 1
        })
      },
      function (err) {})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.getInterActiveInformationData();
  },

  //获取互动信息
  getInterActiveInformationData() {
    var that = this;
    var prams = {}
    http.getRequest(app.data.baseUrl + "spb/getInterActiveInformation", prams,
      function (res) {
        if (res.data.length > 0) {
          that.setData({
            commentCount: res.commentCount,
            giveCount: res.giveCount,
            interActiveList: res.data,
            isData: true
          })
        } else {
          that.setData({
            isData: false
          })
        }
      },
      function (err) {
        that.setData({
          isData: false
        })
      })
  },

  /**
   * 点赞
   * @param {} params 
   */
  giveClick: function (e) {
    let data = e.currentTarget.dataset;
    if (data.givetype == 1) {
      this.setData({
        bbsId: data.bbsid,
        giveType: 2
      })
      this.cancelGiveUp(data.index, data.userid);
    } else if (data.givetype == 2) {
      this.setData({
        bbsId: data.bbsid,
        giveType: 1
      })
      this.addGiveUp(data.index, data.userid);
    }
  },
  /**
   * 添加点赞
   */
  addGiveUp(index, userId) {
    var that = this;
    var giveUps = that.data.interActiveList[index].giveUps;
    for (var i = 0; i < giveUps.length; i++) {
      if (Object.is(parseInt(giveUps[i].userId), parseInt(userId))) {
        that.setData({
          giveId: giveUps[i].giveId,
        })
        break
      }
    }
    var prams = {
      giveId: that.data.giveId,
      bbsId: that.data.bbsId,
      giveType: that.data.giveType,
      userId: that.data.userId,
      nickName: that.data.nickName,
      avatarUrl: that.data.bgPic,
    }
    http.httpPostRequest(app.data.baseUrl + "spb/addInterActiveGive", prams,
      function (res) {
        var item = res.data;
        if (res.data) {
          wx.showToast({
            title: '点赞成功',
            //提示内容        
            icon: 'none'
          })
          var give_list = that.data.interActiveList[index].giveUps; //获取data中的点赞列表 
          var give_detail = {} //声明一个点赞对象    
          give_detail.giveId = item.giveId; //点赞Id  
          give_detail.userId = item.userId; //用户Id  
          give_list.unshift(give_detail);
          that.data.interActiveList[index].giveType = item.giveType; //点赞类型 
          that.setData({
            give_list, //点赞列表
            interActiveList: that.data.interActiveList,
            giveCount: that.data.giveCount + 1
          })
        } else {
          wx.showToast({
            title: '点赞失败',
            //提示内容        
            icon: 'none'
          })
        }
      },
      function (err) {})
  },

  /**
   * 取消点赞
   */
  cancelGiveUp(index, userId) {
    var that = this;
    var giveUps = that.data.interActiveList[index].giveUps;
    for (var i = 0; i < giveUps.length; i++) {
      if (Object.is(parseInt(giveUps[i].userId), parseInt(userId))) {
        that.setData({
          giveId: giveUps[i].giveId
        })
        break
      }
    }
    var prams = {
      giveId: that.data.giveId,
      bbsId: that.data.bbsId,
      giveType: that.data.giveType,
      userId: that.data.userId,
      nickName: that.data.nickName,
      avatarUrl: that.data.bgPic,
    }
    http.httpPostRequest(app.data.baseUrl + "spb/cancelInterActiveGive", prams,
      function (res) {
        var item = res.data;
        if (res.data) {
          wx.showToast({
            title: '取消成功',
            //提示内容        
            icon: 'none'
          })
          that.data.interActiveList[index].giveType = item.giveType; //点赞类型 
          that.setData({
            interActiveList: that.data.interActiveList,
            giveCount: that.data.giveCount - 1
          })
        } else {
          wx.showToast({
            title: '取消失败',
            //提示内容        
            icon: 'none'
          })
        }
      },
      function (err) {})
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
    if (wx.getStorageSync('isSuc')) {
      this.getInterActiveInformationData();
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
    this.getInterActiveInformationData();
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