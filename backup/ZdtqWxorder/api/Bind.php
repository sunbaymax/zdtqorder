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
$logname = $dir . '/'.'bind.txt';
$info = json_encode($_POST);
file_put_contents($logname,date('Y-m-d H:i:s')."\r\n".$info."\r\n",FILE_APPEND);  //记录发送的数据
if (empty($_POST['Telephone'])) {
    echo json_encode(array('code' => '400','msg' => '缺少手机号'));die;
}
$Telephone = $_POST['Telephone'];
$result = $common->mssql_select($link,'WechatUser02','top 1 ID',"Telephone = '$Telephone' and IsDel = '0'",'ID desc',MSSQL_ASSOC,$logname);
if ($result) {
    echo json_encode(array('code' => '400','msg' => '该手机号已经存在'));die;
}
if (empty($_POST['OpenId'])) {
    echo json_encode(array('code' => '400','msg' => '缺少微信号'));die;
}
if (empty($_POST['AccountNumber'])) {
    echo json_encode(array('code' => '400','msg' => '缺少客户账号'));die;
}
$OpenId = trim($_POST['OpenId']);
$AccountNumber = trim($_POST['AccountNumber']);
//检查密码长度
/*if (strlen($PassWord) < '6' || strlen($PassWord) > '20') {
    echo json_encode(array('code' => '400','msg' => '请输入6到20位的密码'));die;
}*/
$data = array('OpenId' => $OpenId,'Telephone' => $Telephone,'AccountNumber' => $AccountNumber);
if (!empty($_POST['Picture'])) {
    $data['Picture'] = $_POST['Picture'];
}
if (!empty($_POST['Name'])) {
    $data['Name'] = $_POST['Name'];
}
$res = $common->mssql_insert($link,$data,'WechatUser02',$logname);
if ($res) {
    echo json_encode(array('code' => '200','msg' => 'success'));die;
} else {
    echo json_encode(array('code' => '400','msg' => 'error'));die;
}