SVG

# 一. SVG简介

1. SVG : Scalable Vector Graphics，可缩放的矢量图
2. SVG常见的四种使用方式
   1. 内嵌到HTML中，通过svg标签
   2. 通过浏览器直接打开SVG文件，这种文件需要给它加上xmlns属性
   3. 在HTML的img标签中引用，通过src属性
   4. 作为css背景使用

# 二.SVG属性

1. 常见属性 （这些属性可以直接在css中使用）
   + fill：设置填充颜色
   + fill-opacity：0~1 设置填充颜色的透明度
   + stroke：设置描边颜色
   + stroke-width：修改描边宽度
   + stroke-opacity：0~1 修改描边透明度
   + stroke-linecap：butt/square/round 设置线段两端帽子
   + stroke-dasharray：设置虚线
   + stroke-linejoin：miter/bevel/round 设置折线转角样式

# 三.简单图形绘制

1. 绘制矩形
   + `<rect></rect>`
   + x/y：指定绘制的位置
   + width/height：指定矩形的宽高
   + fill：指定填充颜色
   + stroke：设置边框颜色
   + stroke-width：设置边框宽度
   + rx/ry：设置边框圆角半径
2. 绘制圆
   + `<circle></circle>`
   + cx/xy：圆心位置
   + r：圆半径
3. 绘制椭圆
   + `<ellipse></ellipse>`
   + cx/cy：圆心位置
   + rx：水平方向半径
   + ry：垂直方向半径
4. 绘制直线
   + `<line></line>`
   + x1/y1：设置起点
   + x2/y2：设置终点
5. 绘制折线
   + `<polyline></polyline>`
   + points：设置所有的点，两两一对
6. 绘制多边形
   + `<polygon></polygon>`
   + points：设置所有的点，两两一对
   + polyline和polygon差不多，只不过polygon会自动关闭路径

# 四.复杂图形绘制

1. 绘制路径
   + `<path></path>`
   + d：路径指令 Ｍ L H V Z
   + 路径指令大写：绝对位置 / 路径指令小写：相对位置
2. 绘制圆弧
   + `<path></path>`
   + A(rx, ry, xr, laf, sf, x, y)
3. 绘制贝塞尔曲线
   + `<path></path>`
   + Q(x1, y1, x, y) ：二次贝塞尔曲线
   + C(x1, y1, x2, y2, x, y)：三次贝塞尔曲线
4. 绘制文本
   + `<text></text>`
   + x/y：设置绘制位置
   + style：设置文字样式
5. 绘制路径文本
   + 先绘制一个路径，然后在文本中引入该路径
6. 绘制超链接
7. 绘制图片
8. 结构元素
   + g
   + use
   + defs
   + symbol
9. 裁剪与蒙板
10. 渐变
11. 画笔
12. 形变

# 五.动画

# 六.脚本编程

