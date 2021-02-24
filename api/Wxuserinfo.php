<?php
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");//解决跨域问题
$openid=$_GET['openid'];
$mysql_conf = array(
    'host'    => 'www.ccsc58.cc', 
    'db'      => 'wechat', 
    'db_user' => 'test01', 
    'db_pwd'  => 'Pzg790915', 
    );

$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
//echo '连接成功';
//die;
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "select openid,nickname,headimgurl from tb_weixin_lengyunuser where openid = '".$openid."';";
$res = $mysqli->query($sql);
//var_dump($res);die;
//if (!$res) {
//	var_dump($res);
////  die("sql error:\n" . $mysqli->error);
//}
 while ($row = $res->fetch_assoc()) {
   	var_dump($row);
   	die;
// if(empty($row)){
// 	echo json_encode(array('code' => '400','msg' => '数据库连接失败'));die;
// }    
// else{
// 	echo json_encode($row,JSON_UNESCAPED_UNICODE);
// }
if(empty($row)||!isset($row))   {
    echo "string \"0\" is false \r\n"; // 输出：string "0" is false
} else {
    echo "string \"0\" is not false \r\n";
}

}
$res->free();
$mysqli->close();
?>
