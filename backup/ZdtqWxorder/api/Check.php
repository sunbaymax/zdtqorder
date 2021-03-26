<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: text/html;charset=GBK");
date_default_timezone_set("PRC");
include ("../DATA_PUBLIC/common.php");  //线上目录
//测试数据库
$link = $linktest;
$dir = 'log/'.date('Y').'/'.date('m').'/'.date('d');
if (!is_dir($dir))  {
    if (!mkdir($dir,0777,true)) {
        echo json_encode(array('code' => '400','msg' => '目录创建失败'));die;
    }
}
$logname = $dir . '/'.'check.txt';
$info = json_encode($_POST);
if (empty($_POST['OpenId'])) {
    echo json_encode(array('code' => '400','msg' => '缺少参数'));die;
}
$OpenId = $_POST['OpenId'];
file_put_contents($logname,date('Y-m-d H:i:s')."\r\n".$info."\r\n",FILE_APPEND);  //记录发送的数据
$result = $common->mssql_select($link,'WechatUser02','top 1 PassWord',"OpenId = '$OpenId' and IsDel = '0'",'ID desc',MSSQL_ASSOC,$logname);
//首先检查是否存在并且可用  检查是否设置过密码
if ($result) {
    $PassWord = $result['0']['PassWord'];
    if ($PassWord) {
        echo json_encode(array('code' => '200','msg' => 'success'));die;
    } else {
        echo json_encode(array('code' => '300','msg' => '未设置密码'));die;
    }
} else {
    echo json_encode(array('code' => '400','msg' => '请先绑定账号'));die;
}

