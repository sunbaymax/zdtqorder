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
$logname = $dir . '/'.'AddressGet.txt';
$info = json_encode($_REQUEST);
file_put_contents($logname,date('Y-m-d H:i:s')."\r\n".$info."\r\n",FILE_APPEND);  //记录发送的数据
try {
    if (!isset($_POST['State']) || empty($_POST['State'])) {
        throw new Exception(json_encode(array('code' => '400','msg' => '缺少操作标识')));
    }
    $State = $_POST['State'];  //操作标识   该文件为寄件地址
    /**
     * 展示地址数据
     */
    if ($State == 'show') {
        if (empty($_POST['Telephone'])) {
            throw new Exception(json_encode(array('code' => '400','msg' => '请输入手机号')));
        }
        $Telephone = $_POST['Telephone'];
        if (empty($_POST['AccountNumber'])) {
            throw new Exception(json_encode(array('code' => '400','msg' => '请输入客户账号')));
        }
        $AccountNumber = $_POST['AccountNumber'];
        //区分展示所有数据还是个别数据
        if (isset($_POST['ID']) && !empty($_POST['ID'])) {
            $ID = $_POST['ID'];
            $result = $common->mssql_select($link,'WechatAddress','top 1 ID,Name,Telephone,Depart,City,Area,Address,Company,AccountNumber,IsDefault',"ID = '$ID' and IsDel = '0' and UserNumber = '$Telephone' and (AccountNumber = '$AccountNumber' or AccountNumber is null)",'ID desc',MSSQL_ASSOC,$logname);
            if (!$result) {throw new Exception(json_encode(array('code' => '400','msg' => '暂无数据')));}
        } else if (isset($_POST['Name']) && !empty($_POST['Name'])) {
            //模糊搜索姓名
            $Name = $_POST['Name'];
            $result = $common->mssql_select($link,'WechatAddress','ID,Name,Telephone,Depart,City,Area,Address,Company,AccountNumber,IsDefault',"Name like '%$Name%' and IsDel = '0' and UserNumber = '$Telephone' and (AccountNumber = '$AccountNumber' or AccountNumber is null)",'ID desc',MSSQL_ASSOC,$logname);
            if (!$result) {throw new Exception(json_encode(array('code' => '400','msg' => '暂无数据')));}
        } else {
            //展示该账号所有寄件地址+收件地址
            $result = $common->mssql_select($link,'WechatAddress','ID,Name,Telephone,Depart,City,Area,Address,Company,AccountNumber,IsDefault',"IsDel = '0' and UserNumber = '$Telephone' and (AccountNumber = '$AccountNumber' or AccountNumber is null)",'ID desc',MSSQL_ASSOC,$logname);
            if (!$result) {throw new Exception(json_encode(array('code' => '400','msg' => '暂无数据')));}
        }
        echo json_encode(array('code' => '200','msg' => 'success','data' => $result));die;
    } else if ($State == 'add') {
        if (empty($_POST['Company'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少公司')));}
        if (empty($_POST['Depart'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少省份')));}
        if (empty($_POST['City'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少城市')));}
        if (empty($_POST['Address'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少详细地址')));}
        if (empty($_POST['Telephone'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少电话')));}
        if (empty($_POST['Name'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少联系人')));}
        if (empty($_POST['AccountTelephone'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少账号电话')));}
        $Company = $_POST['Company'];
        $Depart = $common->check($_POST['Depart']);
        $City = $common->check($_POST['City']);
        $Address = $_POST['Address'];
        $Telephone = $_POST['Telephone'];
        $AccountTelephone = $_POST['AccountTelephone'];
        $Name = $_POST['Name'];
        $arr = [];
        if (empty($_POST['Area'])) {
            $result = $common->mssql_select($link,'WechatAddress','top 1 ID',"Company = '$Company' and Name = '$Name' and Telephone = '$Telephone' and Depart = '$Depart' and City = '$City' and Address = '$Address'  and UserNumber = '$AccountTelephone' and IsDel = '0' and AccountNumber is null",'ID desc',MSSQL_ASSOC,$logname);
        } else {
            $Area = $_POST['Area'];
            $arr['Area'] = $Area;
            $result = $common->mssql_select($link,'WechatAddress','top 1 ID',"Company = '$Company' and Name = '$Name' and Telephone = '$Telephone' and Depart = '$Depart' and City = '$City' and Address = '$Address' and Area = '$Area' and UserNumber = '$AccountTelephone' and IsDel = '0' and AccountNumber is null",'ID desc',MSSQL_ASSOC,$logname);
        }
        if ($result) {throw new Exception(json_encode(array('code' => '400','msg' => '该信息已经存在')));}
        $arr['Company'] = $Company;
        $arr['Address'] = $Address;
        $arr['City'] = $City;
        $arr['Depart'] = $Depart;
        $arr['Telephone'] = $Telephone;
        $arr['Name'] = $Name;
        $arr['UserNumber'] = $AccountTelephone;
        //开启事务
        mssql_query('begin tran',$link);
        $resultinsert = $common->mssql_insert($link,$arr,'WechatAddress',$logname);
        if ($resultinsert) {
            echo json_encode(array('code' => '200','msg' => 'success'));
        } else {
            throw new Exception(json_encode(array('code' => '400','msg' => '写入失败')));
        }
        mssql_query('commit tran',$link);
    }
} catch (Exception $e) {
    echo $e->getMessage();
    mssql_query('rollback tran',$link);
    file_put_contents($logname,date('Y-m-d H:i:s')."\r\n".$e->getMessage()."\r\n",FILE_APPEND);die;  //记录error
}