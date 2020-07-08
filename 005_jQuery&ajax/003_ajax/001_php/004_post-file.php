<?php
//print_r($_POST);

// 1.获取上传文件对应的字典
$fileInfo = $_FILES["upFiles"];
// 2.获取上传文件名称
$fileName = $fileInfo["name"];
// 3.获取上传文件保存的临时路径
$filePath = $fileInfo["tmp_name"];
// 4.移动文件
move_uploaded_file($filePath, "../003_resource/".$fileName);