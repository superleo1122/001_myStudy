# 微信小程序

## 一. 坑

1. 页面可以通过引用Behaviors来获取某些共用的数据和方法
2. 默认情况下在scroll-view上使用flex是无效的，需要设置enable-flex为true
3. scroll-view默认高度是150rpx，可以设置为可动态变换的宽高
4. 对于全局样式，pages里的页面可以全部继承，但组件里的只能继承font和color属性

## 二. API

### 1. 基础

### 2. 路由

1. wx.switchTab()
   + 跳转到tabBar页，并关闭其他所有非tabBar页面
2. wx.reLaunch()
   + 关闭所有页面，打开到应用内的某个页面
3. wx.redirectTo()
   + 关闭当前页面，跳转到应用内的某个页面，但不允许跳转到tabbar页面
4. wx.navigateTo()
   + 保留当前页面，跳转到应用内的某个页面，但不允许跳转到tabbar页面。页面栈最多十层
5. wx.navigateBack()
   + 关闭当前页面，返回上一页或多级页面，可通过getCurrentPages获取当前的页面栈，决定需要返回几层。
6. 页面间事件通信通道