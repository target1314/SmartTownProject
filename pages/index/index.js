//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    chunnelDefault: [
      {
        name: '温室大棚',
        type: '1',
        image: '/image/home/dapeng.png'
      },
      {
        name: '水产养殖',
        type: '2',
        image: '/image/home/shuichan.png'
      }, {
        name: '智慧党建',
        type: '3',
        image: '/image/home/dangjian.png'
      },
      {
        name: '精准扶贫',
        type: '4',
        image: '/image/home/fuping.png'
      },
      {
        name: '土地流转',
        type: '5',
        image: '/image/home/tudi.png'
      },
      {
        name: '景区流量',
        type: '6',
        image: '/image/home/jingqu.png'
      },
      {
        name: '山体滑坡',
        type: '7',
        image: '/image/home/shantihuapo.png'
      },
      {
        name: '疫情防控',
        type: '8',
        image: '/image/home/yiqing.png'
      },
      {
        name: '数据登记',
        type: '9',
        image: '/image/home/shujudengji.png'
      }
    ]
  },
  //事件处理函数
  goclick: function (e) {
    let data = e.currentTarget.dataset.item,
      type = data.type;
    switch (type) {
      case "1":
        wx.navigateTo({
          url: '../greenhouse/greenhouse?name='+ data.name
        })
        break
      case "2":
        wx.navigateTo({
          url: '../aquaculture/aquaculture?name='+ data.name
        })
        break
      case "3":
        wx.navigateTo({
          url: '../partybuilding/partybuilding?name='+ data.name
        })
        break
      case "4":
        wx.navigateTo({
          url: '../targetedpovertyalleviation/targetedpovertyalleviation?name='+ data.name
        })
        break
      case "5":
        wx.navigateTo({
          url: '../landcirculation/landcirculation?name='+ data.name
        })
        break
      case "6":
        wx.navigateTo({
          url: '../scenicspotflow/scenicspotflow?name='+ data.name
        })
        break
      case "7":
        wx.navigateTo({
          url: '../landslide/landslide?name='+ data.name
        })
        break
      case "8":
        wx.navigateTo({
          url: '../epidemicprevention/epidemicprevention?name='+ data.name
        })
        break
      case "9":
        wx.navigateTo({
          url: '../informationregistration/informationregistration?name='+ data.name
        })
        break
    }
  },
  onLoad: function () {},
})