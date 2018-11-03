<?php 

include_once './fn.php';
$responseStasus = "222";
$responseMsg = "用户名或密码错误";
$responseDate = null;


$user = $_POST["username"];
$pass = $_POST["password"];

$sql ="SELECT * FROM t_user where name='$user' and password='$pass'"; 


$res = my_query( $sql );

if( $res ) {
    $responseDate = $res[0];
    $responseStasus = "000";
    $responseMsg = "登录成功";
}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);


?>