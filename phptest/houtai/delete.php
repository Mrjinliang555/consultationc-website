<?php  


include_once './fn.php';
$responseStasus = "222";
$responseMsg = "删除失败";
$responseDate = null;


$arr = ["t_bannerlist"];
$index = $_GET["index"];

if( $index || $index === "0" ){

    $id = $_GET["id"];

    if( $id ){

        $index = intval($index);
        $table = $arr[$index];


        $sql ="delete from ".$table." where id = $id"; 

        $res = my_exec($sql);

        if( $res ) {
            $responseStasus = "000";
            $responseMsg = "删除成功";
        }
    }

}

$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate  );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);












?>