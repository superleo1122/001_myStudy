# 移动端开发

## 一. 移动端适配方案

### 1. 前端开发常用单位

1. 像素 -- Pixel

   + 像素不会随着视口的变化而变化，是一个绝对单位

2. 百分比

   + 动态单位，永远都是以当前元素的父元素作为参考进行计算

3. em

   + 是一个相对于字体大小的动态单位

4. rem

   + rem是一个相对于根元素字体大小的动态单位
   + 若根元素没有设置字体大小，则相对于浏览器默认的字体大小

5. vw vh

   + vw: viewport width
   + vh: viewport height
   + 是一个相对于网页视口的单位，系统会将视口的宽高各分成100份
     + vmin: vw和vh中较小的那个
     + vmax: vw和vh中较大的那个
     + 使用场景：保证移动开发中屏幕旋转之后尺寸不会变

6. 视口理解

   + 视口简单理解就是可视区域大小

     + 在pc端，视口就是浏览器窗口可视区域的大小
     + 在移动端，视口大小并不等于窗口大小，移动端视口宽度被人为定义了980

   + 保证移动端不自动缩放网页的尺寸

     + 通过meta设置视口大小

     + ```html
       <meta name="viewport" content="width=device-width,initial-scale=1.0">
       <!--
       	width=device-width:设置视口宽度等于设备宽度
       	initial-scale=1.0 初始缩放比例，1不缩放
       	maximum-scale: 允许用户缩放到的最大比例
       	minmum-scale: 允许用户缩放到的最小比例
       	user-scalable: 允许是否可以手动缩放
       -->
       ```

### 2. 移动端常用适配方案

1. 前提知识

   + 页面自动跳转
     + 通过页面自动跳转，实现PC端一套代码，移动端一套代码，在PC端打开自动打开PC端界面，在移动端打开自动打开移动端界面
     + 实现步骤
       1. 默认打开PC端界面
       2. 在PC端界面中通过BOM拿到当前浏览器信息
       3. 通过正则判断当前浏览器是否是移动端浏览器
       4. 通过BOM的location对象实现跳转到移动端界面
   + 像素
     + 像素可以分为物理像素和逻辑像素
     + 在pc端，物理像素往往等于逻辑像素，而在移动端，物理像素与逻辑像素可能不等

2. 方案一：媒体查询

   + 通过查询设备的宽度来执行不同的css代码，最终达到界面的配置
   + 优势：
     + 简单，调整屏幕宽度不用刷新页面即可响应式展示，特别适合对移动端和pc端维护同一套代码的时候
   + 劣势：
     + 由于移动端和PC端维护同一套代码，代码量大，维护不方便
   + 应用场景：
     + 简单界面的网页，例如企业官网，宣传单页

3. 方案二：媒体查询 + rem

4. 方案三：

   + 方案二升级版，动态计算font-size大小
   + document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px";
   + 注意：缩放的默认前提都是原始画板宽为750，所以这里除以7.5，就是说将原始画板分为7.5份，每份100，而除以15，则每份50

5. 方案四

   + 方案三升级版，消除逻辑像素和物理像素不等问题

   + ```js
     let scale = 1.0 / window.devicePixelRatio;
     let text = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`;
     document.write(text);
     document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px";
     ```