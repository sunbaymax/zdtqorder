<?php
header("Content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");//解决跨域问题
$openid=$_GET['openid'];
//连接mysql数据库
	/**
	 * @param $host      主机名
	 * @param $username  用户名
	 * @param $password  密码
	 * @param $db        数据库名
	 * @return bool
	 */
    function link_mysql($host,$username,$password,$db)
	{
		$link = mysqli_connect($host,$username,$password);
		if (!$link) {echo json_encode(array('code' => '400','msg' => '数据库连接失败'));die;}
		$con = mysqli_select_db($link,$db);
		if (!$con) {echo json_encode(array('code' => '400','msg' => '数据库选择失败'));die;}
		mysqli_set_charset($link,'utf8');
		return $link;
	}
	$link = link_mysql('www.ccsc58.cc','test01','Pzg790915','wechat');
	$sql = "select openid,nickname,headimgurl from tb_weixin_lengyunuser where openid = '".$openid."';";
	$res = mysqli_query($link,$sql);
	$result = mysqli_fetch_array($res,MYSQLI_ASSOC);
	if(empty($result)||$result==NULL){
   	   echo json_encode(array('code' => '400','msg' => '数据库连接失败'));die;
    }    
    else{
     echo json_encode(array('code'=>'20000','message'=>'请求成功','list'=>$result));
    }
?>
