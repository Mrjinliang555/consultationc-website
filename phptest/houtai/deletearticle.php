<?php 

include_once './fn.php';

$responseStasus = "222";
$responseMsg = "删除失败";
$responseDate = null;

$id = $_GET["id"];

$sql = "delete from t_article where id = $id";
$res = my_exec($sql);
if( $res ) {
    $responseStasus = "000";
    $responseMsg = "删除成功";
}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);

?>