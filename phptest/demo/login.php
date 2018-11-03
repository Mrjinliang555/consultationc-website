<?php 

header('Access-Control-Allow-Origin:*');  // 响应类型  
header('Access-Control-Allow-Methods:*');  // 响应头设置  
header('Access-Control-Allow-Methods:*'); 
header('Access-Control-Allow-Headers:x-requested-with,content-type:application/json');

$userName = $_GET['userName'];
$passWord = $_GET['passWord'];

if( $userName != 'ljl' || $passWord != 666 ){
    $result = array(
        "msg" => '用户名或密码错误',
        "code" => 100
    );
}else {
    $result = array(
        "msg" => 'ok',
        "code" => 200
    );
}


     //     echo json_encode("asdf");  这种方式返回数据网页能接收，curl命令能接收，但是app接收为null
echo json_encode($result);

?>