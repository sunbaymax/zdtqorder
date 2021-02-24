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
$logname = $dir . '/'.'AddressSend.txt';
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
        //增加的时候可能会设置默认地址  设置的时候要将之前的取消默认
        if (empty($_POST['Company'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少公司')));}
        if (empty($_POST['Depart'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少省份')));}
        if (empty($_POST['City'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少城市')));}
        if (empty($_POST['Address'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少详细地址')));}
        if (empty($_POST['Telephone'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少电话')));}
        if (empty($_POST['Name'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少联系人')));}
        if (empty($_POST['AccountNumber'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少客户账号')));}
        $arr = [];
        //可有可无的数据
        if (!empty($_POST['Area'])) {$arr['Area'] = $_POST['Area'];}
        $arr['Company'] = $_POST['Company'];
        $arr['Address'] = $_POST['Address'];
        $arr['City'] = $common->check($_POST['City']);
        $arr['Depart'] = $common->check($_POST['Depart']);
        $Telephone = $_POST['Telephone'];
        $arr['Telephone'] = $Telephone;
        $arr['Name'] = $_POST['Name'];
        $arr['UserNumber'] = $Telephone;
        $AccountNumber = $_POST['AccountNumber'];
        $arr['AccountNumber'] = $AccountNumber;
        //开启事务
        mssql_query('begin tran',$link);
        if (isset($_POST['IsDefault']) && $_POST['IsDefault'] == '1') {
            $arr['IsDefault'] = '1';
            //设为默认寄件地址  首先将之前的全部改为非默认
            $arrdefault = [];
            $arrdefault['IsDefault'] = '0';
            $updateDefault = $common->mssql_update($link,$arrdefault,'WechatAddress',"UserNumber = '$Telephone' and AccountNumber = '$AccountNumber' and IsDel = '0'",$logname);
        }
        $resultinsert = $common->mssql_insert($link,$arr,'WechatAddress',$logname);
        if ($resultinsert) {
            echo json_encode(array('code' => '200','msg' => 'success'));
        } else {
            throw new Exception(json_encode(array('code' => '400','msg' => '写入失败')));
        }
        mssql_query('commit tran',$link);

    } else if ($State == 'edit') {
        //编辑地址  注意去重 还要考虑设置默认地址的为题
        if (empty($_POST['Company'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少公司')));}
        if (empty($_POST['ID'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少ID')));}
        if (empty($_POST['Depart'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少省份')));}
        if (empty($_POST['City'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少城市')));}
        if (empty($_POST['Address'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少详细地址')));}
        if (empty($_POST['Telephone'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少电话')));}
        if (empty($_POST['AccountTelephone'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少账号电话')));}
        if (empty($_POST['Name'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少联系人')));}
        if (empty($_POST['AccountNumber'])) {throw new Exception(json_encode(array('code' => '400','msg' => '缺少客户账号')));}
        $arr = [];
        $Company = $_POST['Company'];
        $ID = $_POST['ID'];
        $Depart = $common->check($_POST['Depart']);
        $City = $common->check($_POST['City']);
        $Address = $_POST['Address'];
        $Telephone = $_POST['Telephone'];
        $AccountTelephone = $_POST['AccountTelephone'];
        $Name = $_POST['Name'];
        $AccountNumber = $_POST['AccountNumber'];
        if (empty($_POST['Area'])) {
            $result = $common->mssql_select($link,'WechatAddress','top 1 ID',"Company = '$Company' and Name = '$Name' and Telephone = '$Telephone' and Depart = '$Depart' and City = '$City' and Address = '$Address' and AccountNumber = '$AccountNumber' and UserNumber = '$AccountTelephone' and IsDel = '0' and ID != '$ID'",'ID desc',MSSQL_ASSOC,$logname);
        } else {
            $Area = $_POST['Area'];
            $arr['Area'] = $Area;
            $result = $common->mssql_select($link,'WechatAddress','top 1 ID',"Company = '$Company' and Name = '$Name' and Telephone = '$Telephone' and Depart = '$Depart' and City = '$City' and Address = '$Address' and Area = '$Area' and AccountNumber = '$AccountNumber' and UserNumber = '$AccountTelephone' and IsDel = '0' and ID != '$ID'",'ID desc',MSSQL_ASSOC,$logname);
        }
        if ($result) {throw new Exception(json_encode(array('code' => '400','msg' => '该信息已经存在')));}
        $arr['Company'] = $Company;
        $arr['Address'] = $Address;
        $arr['City'] = $City;
        $arr['Depart'] = $Depart;
        $arr['Telephone'] = $Telephone;
        $arr['Name'] = $Name;
        $arr['UserNumber'] = $AccountTelephone;
        $arr['AccountNumber'] = $AccountNumber;
        //判断是否设为默认地址
        //开启事务
        mssql_query('begin tran',$link);
        if (isset($_POST['IsDefault']) && $_POST['IsDefault'] == '1') {
            $arr['IsDefault'] = '1';
            //设为默认寄件地址  首先将之前的全部改为非默认
            $arrdefault = [];
            $arrdefault['IsDefault'] = '0';
            $updateDefault = $common->mssql_update($link,$arrdefault,'WechatAddress',"UserNumber = '$AccountTelephone' and AccountNumber = '$AccountNumber' and IsDel = '0'",$logname);
        }
        $resultupdate = $common->mssql_update($link,$arr,'WechatAddress',"ID = '$ID'",$logname);
        if ($resultupdate) {
            echo json_encode(array('code' => '200','msg' => 'success'));
        } else {
            throw new Exception(json_encode(array('code' => '400','msg' => '更新失败')));
        }
        mssql_query('commit tran',$link);

    } else if ($State == 'del') {
        //删除操作
        if (empty($_POST['Telephone'])) {
            throw new Exception(json_encode(array('code' => '400','msg' => '请输入手机号')));
        }
        $Telephone = $_POST['Telephone'];
        if (empty($_POST['AccountNumber'])) {
            throw new Exception(json_encode(array('code' => '400','msg' => '请输入客户账号')));
        }
        $AccountNumber = $_POST['AccountNumber'];
        if (empty($_POST['ID']) || !is_array($_POST['ID'])) {
            throw new Exception(json_encode(array('code' => '400','msg' => '请正确传入主键')));
        }
        mssql_query('begin tran',$link);
        foreach ($_POST['ID'] as $value) {
            $time = date('Y-m-d H:i:s');
            $datadel = array('IsDel' => '1','UpdateTime' => $time);
            $delete = $common->mssql_update($link,$datadel,'WechatAddress',"ID = '$value' and AccountNumber = '$AccountNumber' and UserNumber = '$Telephone'",$logname);
            if (!$delete) {
                throw new Exception(json_encode(array('code' => '400','msg' => $value.'删除失败')));
            }
        }
        mssql_query('commit tran',$link);
        echo json_encode(array('code' => '200','msg' => 'success'));die;
    }

} catch (Exception $e) {
    echo $e->getMessage();
    mssql_query('rollback tran',$link);
    file_put_contents($logname,date('Y-m-d H:i:s')."\r\n".$e->getMessage()."\r\n",FILE_APPEND);die;  //记录error
}