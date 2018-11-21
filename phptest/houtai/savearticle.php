<?php  

include_once './fn.php';

$responseStasus = "222";
$responseMsg = "文章保存失败";
$responseDate = null;


$author = $_POST["author"];
$category = $_POST["category"];
$content = $_POST["content"];
$effectiveTime = $_POST["effectiveTime"];
$isTiming = $_POST["isTiming"];
$isTop = $_POST["isTop"];
$only = $_POST["only"];
$source = $_POST["source"];
$status= $_POST["status"];
$title= $_POST["title"];
$creatTime = $_POST["creatTime"];
$authorPto = $_POST["authorPto"];
$keyWord = $_POST["keyWord"];


$effectiveTime = @strtotime($effectiveTime);
if( !$effectiveTime ) {
    $effectiveTime = 9999999999;
}
if( $creatTime ){
    $creatTime = @strtotime($creatTime);
}else {
    $creatTime = @time();
}




$responseDate = array( 'author'=>$author, '$category' =>$category,'$content'=>$content
,'$effectiveTime'=>$effectiveTime,'$isTiming'=>$isTiming,'$isTop'=>$isTop,'$only'=>$only,'$source'=>$source,
'$status'=>$status,'$title'=>$title, '$creatTime'=> $creatTime, '$authorPto'=>$authorPto, '$keyWord'=>$keyWord );














$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);




?>