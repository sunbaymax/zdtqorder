<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: text/html;charset=GBK");
date_default_timezone_set("PRC");
require_once("../DATA_PUBLIC/common.php");
//测试数据库  电影 杀人工厂
$link = $linktest;
$dir = 'log/'.date('Y').'/'.date('m').'/'.date('d');
if (!is_dir($dir))  {
    if (!mkdir($dir,0777,true)) {
        echo json_encode(array('code' => '400','msg' => '目录创建失败'));die;
    }
}
$logname = $dir . '/'.'OrderShow.txt';
$info = json_encode($_POST);
file_put_contents($logname,date('Y-m-d H:i:s')."\r\n".$info."\r\n",FILE_APPEND);  //记录发送的数据
if (empty($_POST['Telephone']) || empty($_POST['AccountNumber'])) {
    echo json_encode(array('code' => '400','msg' => '手机号与客户账号缺一不可'));die;
}
$Telephone = $_POST['Telephone'];
$AccountNumber = $_POST['AccountNumber'];
/**
 * 检查是否有默认的寄件地址
 * 检查是否有寄件地址
 * 检查有的话展示地址  没有的话返回300
 */
$Address1 = $common->mssql_select($link,'WechatAddress','top 1 AccountNumber,Name,Depart,City,Area,Address,Telephone,IsDefault,Telephone,Company',"UserNumber = '$Telephone' and IsDefault = '1' and IsDel = '0' and AccountNumber = '$AccountNumber'",'ID desc',MSSQL_ASSOC,$logname);
if ($Address1) {
    echo json_encode(array('code' => '200','msg' => 'success','data' => $Address1['0']));die;
} else {
    $bb = $common->mssql_select($link,'WechatAddress','top 1 AccountNumber,Name,Depart,City,Area,Address,Telephone,IsDefault,Telephone,Company',"UserNumber = '$Telephone' and IsDel = '0' and AccountNumber = '$AccountNumber'",'ID desc',MSSQL_ASSOC,$logname);
    if ($bb) {
//        print_r($bb);
        echo json_encode(array('code' => '200','msg' => 'success','data' => $bb['0']));die;
    } else {
//        echo 'false';
        echo json_encode(array('code' => '300','msg' => '请录入寄件信息'));die;
    }
}