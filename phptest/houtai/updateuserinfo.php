<?php  

include_once './fn.php';
$responseStasus = "222";
$responseMsg = "修改失败";
$responseDate = null;


$id = $_POST["id"];
$phone = @$_POST["phone"];
$email = @$_POST["email"];
$addr = @$_POST["addr"];
$password = @$_POST["password"];


if( $password ){
    $sql ="update t_user set password='$password' where id=$id"; 
}else {

    $sql ="update t_user set phone='$phone' where id=$id";

    if( $email && $addr ){
        $sql ="update t_user set phone='$phone',addr='$addr',email='$email' where id=$id";
    }else {
        if( $email ) {
            $sql ="update t_user set phone='$phone',email='$email' where id=$id";
        }
        if( $addr ) {
            $sql ="update t_user set phone='$phone',addr='$addr' where id=$id";
        }
    }
}

$result = my_exec($sql);

if( $result ) {
    $responseStasus = "000";
    $responseMsg = "修改成功";
}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data'=> $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);


?>