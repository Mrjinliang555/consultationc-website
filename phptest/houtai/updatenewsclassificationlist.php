<?php 

include_once './fn.php';

$responseStasus = "222";
$responseMsg = "获取列表失败";
$responseDate = null;

$type = $_GET['type'];

if( $type == 1  ){

    $sql ="SELECT * FROM t_news_classification"; 

    $res = my_query( $sql );
    
    if( $res ) {
        $responseDate = $res;
        $responseStasus = "000";
        $responseMsg = "获取成功";
    }

}

if( $type == 2 ){
    $id = $_GET["id"];
    $sql = "delete from t_news_classification where id = $id";
    $res = my_exec($sql);
    if( $res ) {
        $responseDate = $res;
        $responseStasus = "000";
        $responseMsg = "删除成功";
    }
}

if( $type == 4 ){
    $value = $_GET["value"];

    $sql = "select * from t_news_classification where name='$value'";

    if(  my_query($sql) ){
        $responseMsg = "分类名称已经存在";
    }else {
        $num = create_type();

        $sql = "insert into t_news_classification (name,type) values('$value', '$num')";
        $res = my_exec($sql);
        if( $res ) {
            $responseDate = $res;
            $responseStasus = "000";
            $responseMsg = "添加成功";
        }
    }
    
}


$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);

?>