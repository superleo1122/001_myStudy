// pages/z-test/test.js
Page({

    /**
   * 页面的初始数据
   */
    data: {
        tabs: [
            { id: 0, name: '体育', active: true },
            { id: 1, name: '微博', active: false },
            { id: 2, name: '新闻', active: false },
        ]
    },

    handleTabsItemChange(e) {
        const { index } = e.detail;
        const { tabs } = this.data;
        tabs.forEach((v, i) => (i === index ? v.active = true : v.active = false));
        this.setData({
            tabs
        });
    }
});
