<?php
// 若执行结果有中文，必须在php文件顶部设置 charset=utf-8
// 例如：header("content-type:text/html;charset=utf-8);
// 若php中需要返回xml数据，也必须在php文件顶部设置 content-type:text/xml
header("content-type:text/xml;charset=utf-8");
echo file_get_contents("./file/info.xml");
