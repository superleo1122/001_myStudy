# 一、HTML

1. http协议：让浏览器和服务器能够进行通信，它规定了数据如何进行传输。

## 1. html

1. html是一门标记语言，它用来描述网页文本语义

2. xhtml是html在发展过程中的一个分支，后来被合并到html5

3. head元素用于配置网页的信息

4. 文件保存的字符集应该和指定的字符集一致

5. html5文档声明是向下兼容的`<!DOCTYPE html>` ,这个不是html标签，他是一个声明文档的指令

6. xhtml比html严格，html5比html功能多

7. 基础标签

   + h标签要慎用，一个页面尽量只使用一个h标签

   + img 这是一个内联元素，居然有宽高属性

     + src
     + width/height : 若没有指定宽度，则按照图片默认的宽高显示；若只设定了其中的一个值，那么另一个值会按比例进行缩放
     + title
     + alt

   + a标签

     1. base标签可以统一设定a标签的打开方式

     2. 假链接 ：点击之后不会跳转（有两种格式）

        + `#`

        + javascript:

        + 二者区别：#的假链接会自动回到网页的顶部，而javascript：的假链接不会自动回到网页顶部

     3. 锚点：使用id属性（好像有的使用name属性）

        + ```html
          <a href="#bottom"></a>
          <a id="bottom">我是底部</a>
          ```

        + 通过a标签锚点进行跳转不能设置过渡动画，所以若一个跳转过程没有过渡动画，那么很大可能是使用a标签进行跳转的

        + a标签还可以跳转到其他页面的指定位置

          + ```html
            <a href="user.html#bottom"></a>
            ```

   + 列表

     + ul

     + ol

     + dl(自定义列表)

       + ```html
         <!-- dl格式 -->
         <dl>
             <dt></dt>  // 定义标题
             <dd></dd>  // 定义描述
         </dl>
         
         <!--
         	一个dt后面可以跟着多个dd
         	但推荐一个dt对应一个dd
         -->
         ```

       + 应用场景

         + 网站底部相关信息
         + 图文混排

   + table

     1. 注意点

        + width/height 可以给table和td标签使用 (默认按照内容宽高调整)
        + 水平对齐可以给table\tr\td标签使用，垂直对齐只能给tr\td标签使用
        + 外边距和内边距只能给table标签使用 (单元格和单元格之间的距离称为外边距，默认外边距是2px)

     2. cellspacing

     3. caption: 表格标题，紧跟table元素

     4. 表格结构

        + 表格标题
        + 表头
        + 主体数据
        + 页尾数据

     5. 表格完整结构

        + ```html
          <table>
              <caption>表格标题</caption>
              <thead>
              	<tr>
                  	<th>每一列标题</th>
                  </tr>
              </thead>
              <tbody>
              	<tr>
                  	<td></td>
                  </tr>
              </tbody>
              <tfoot>
              	<tr>
                  	<td></td>
                  </tr>
              </tfoot>
          </table>
          ```

        + 若没有填写tbody，那么浏览器会自动添加tbody

   + 

   + 表单

     1. 在浏览器中所有的表单标签都有特殊的外观和默认的功能

     2. 表单标签

        + label : 让输入框和文字绑定一起 （通过for属性关联input的id）

        + datalist ：给输入框绑定待选项

          + ```html
            <datalist>
            	<option></option>
                <option></option>
            </datalist>
            ```

        + fieldset : 给表单添加边框

          + ```html
            <form>
                <fieldset>
                    <legend>
                        title
                    </legend>
                </fieldset>
            </form>
            ```

   + video

     + autoplay 自动播放
     + controls : 添加控制条
     + poster
     + loop 循环播放
     + preload 预加载视频，和autoplay属性有冲突
     + muted 静音
     + width
     + height
     + video标签中添加muted静音属性可以解决有时添加了autoplay属性但视频还是无法自动播放问题

   + audio

   + marqueee : 跑马灯效果

   + 用i标签来设置css的钩子

8. 字符实体
   + `&lt;`
   + `&gt;`  