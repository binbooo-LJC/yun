// pages/address_add/index.js
var unit = require('../../utils/util.js');
var commonCityData = require('../../utils/city.js')
const app = getApp();
const appdata = app.globalData;
const url = appdata.app_address + appdata.subDomain;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proData: [],
    cityData: [],
    disData: [],
    SelectPro: '请选择',
    SelectCity: '请选择',
    SelectDis: '请选择',
    cityIndex: '',
    hasdis: true,
    adddetail: {},
    proval: '',
    cityval: '',
    disval: '',
    pageType: 0,
    id: ''
  },
  // 获取表单数据,表单提交
  formSubmit: function (e) {
    var that = this;
    var val = e.detail.value
    console.log(val);
    if (!val.name) {
      wx.showModal({
        title: '提示',
        content: '请填写记录名称',
        showCancel: false
      })
      return;
    }
    if (!val.phone) {
      wx.showModal({
        title: '提示',
        content: '输入电话号码',
        showCancel: false
      })
      return;
    }
    if (!unit.checkPhone(val.phone)) {
      wx.showModal({
        title: '提示',
        content: '电话输入有误',
        showCancel: false
      })
      return;
    }
    if (!val.address) {
      wx.showModal({
        title: '提示',
        content: '请填写网站账号',
        showCancel: false
      })
      return;
    }
    if (!val.postCode) {
      wx.showModal({
        title: '提示',
        content: '请填写密码/密码备注',
        showCancel: false
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
      wx.request({
        url: url + '/user/shipping-address/update',
        data: {
          token: wx.getStorageSync('token'),
          id: that.data.id,
          provinceId: 220000,
          cityId: 220100,
          districtId: 220101,
          linkMan: val.name,
          address: val.address,
          mobile: val.phone,
          code: val.postCode,
          isDefault: true,
          status: 0,
        },
        success: function (res) {
          console.log(res.data);
          wx.hideLoading();
          if (res.data.code == 0) {
            wx.navigateBack();
          }
        }
      })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */

  deleteaddress: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除地址',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: url + '/user/shipping-address/delete',
            data: {
              token: wx.getStorageSync('token'),
              id: that.data.id
            },
            success: function (res) {
              if (res.data.code == 0) {
                wx.navigateBack();
              }
            }
          })
        }
      }
    })

  },
  onLoad: function (e) {
    console.log(commonCityData);
    var that = this;
    if (e.id) {
      that.setData({
        pageType: 1,
        id: e.id
      })
      wx.setNavigationBarTitle({
        title: '修改记录',
      })
      wx.request({
        url: url + "/user/shipping-address/detail",
        data: {
          token: wx.getStorageSync('token'),
          id: e.id
        },
        success: function (res) {
          if (res.data.code == 0) {
            var hasdis = '';
            that.setData({
              adddetail: res.data.data,
            })
          }
        }
      })
    } 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {

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