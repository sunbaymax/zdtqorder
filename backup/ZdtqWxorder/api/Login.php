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
$logname = $dir . '/'.'login.txt';
$info = json_encode($_REQUEST);
file_put_contents($logname,date('Y-m-d H:i:s')."\r\n".$info."\r\n",FILE_APPEND);  //记录发送的数据
if (empty($_REQUEST['State'])) {
    echo json_encode(array('code' => ' 400','msg' => '缺少操作标识'));die;
}
$State = $_REQUEST['State'];

if ($State == 'show') {
    if (empty($_REQUEST['OpenId'])) {
        echo json_encode(array('code' => '400','msg' => '缺少openid'));die;
    }
    $OpenId = $_REQUEST['OpenId'];
    //将该openid的手机号  账号取出
    $result = $common->mssql_select($link,'WechatUser02','top 1 Telephone,Name,Picture,AccountNumber',"OpenId = '$OpenId'",'ID desc',MSSQL_ASSOC,$logname);
    if (!$result) {
        echo json_encode(array('code' => '400','msg' => '请先绑定'));die;
    }
    $result['0']['AccountNumber'] = explode(',',$result['0']['AccountNumber']);
    echo json_encode(array('code' => '200','msg' => 'success','data' => $result['0']));die;
} else if ($State == 'login') {
    //登录的方式  一种密码  一种验证码
    if (empty($_REQUEST['Telephone'])) {
        echo json_encode(array('code' => ' 400','msg' => '缺少手机号'));die;
    }
    $Telephone = $_REQUEST['Telephone'];
    if (empty($_REQUEST['AccountNumber'])) {
        echo json_encode(array('code' => ' 400','msg' => '缺少客户号'));die;
    }
    $AccountNumber = $_REQUEST['AccountNumber'];

    if (isset($_REQUEST['PassWord'])) {
        //手机号密码登录方式
        $PassWord = $_REQUEST['PassWord'];
        $result = $common->mssql_select($link,'WechatUser02','Top 1 ID',"Telephone = '$Telephone' and PassWord = '$PassWord' and IsDel = '0' and AccountNumber like '%$AccountNumber%'",'ID desc',MSSQL_ASSOC,$logname);
        if (!$result) {echo json_encode(array('code' => '400','msg' => '账号或密码错误'));die;}
    } else {
        $result = $common->mssql_select($link,'WechatUser02','top 1 ID',"Telephone = '$Telephone' and IsDel = '0' and AccountNumber like '%$AccountNumber%'",'ID desc',MSSQL_ASSOC,$logname);
        if (!$result) {echo json_encode(array('code' => '400','msg' => '该手机号与客户号还未绑定'));die;}
    }
    echo json_encode(array('code' => '200','msg' => 'success'));die;
    
} else {
    echo json_encode(array('code' => '400','msg' => '请传入正确标识'));die;
}
/*
if (empty($_REQUEST['Telephone'])) {
    echo json_encode(array('code' => ' 400','msg' => '缺少手机号'));die;
}
$Telephone = $_REQUEST['Telephone'];
if (isset($_REQUEST['PassWord'])) {
    //手机号密码登录方式
    $PassWord = $_REQUEST['PassWord'];
    $result = $common->mssql_select($link,'WechatUser02','Top 1 ID',"Telephone = '$Telephone' and PassWord = '$PassWord' and Status = '1'",'ID desc',MSSQL_ASSOC,$logname);
    if (!$result) {echo json_encode(array('code' => '400','msg' => '账号或密码错误'));die;}
} else {
    $result = $common->mssql_select($link,'WechatUser02','top 1 ID',"Telephone = '$Telephone' and Status = '1'",'ID desc',MSSQL_ASSOC,$logname);
    if (!$result) {echo json_encode(array('code' => '400','msg' => '该手机号还未绑定'));die;}
}
//检查地址库是否有值  没有的话需要录入  有的话进入下单界面
$Address1 = $common->mssql_select($link,'WechatAddress','top 1 AccountNumber,Name,Depart,City,Area,Address,Telephone,IsDefault,Telephone,Company',"UserNumber = '$Telephone' and IsDefault = '1' and IsDel = '0'",'ID desc',MSSQL_ASSOC,$logname);
if ($Address1) {
    echo json_encode(array('code' => '200','msg' => 'success','data' => $Address1['0']));die;
} else {
    $bb = $common->mssql_select($link,'WechatAddress','top 1 AccountNumber,Name,Depart,City,Area,Address,Telephone,IsDefault,Telephone,Company',"UserNumber = '$Telephone' and IsDel = '0' and AccountNumber != ''",'ID desc',MSSQL_ASSOC,$logname);
    if ($bb) {
//        print_r($bb);
        echo json_encode(array('code' => '200','msg' => 'success','data' => $bb['0']));die;
    } else {
//        echo 'false';
        echo json_encode(array('code' => '300','msg' => '请录入信息'));die;
    }
}*/

