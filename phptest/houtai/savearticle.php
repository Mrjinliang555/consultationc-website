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

$base64_image_content = $_POST['coverImg'];

if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){

    // 文件类型
    $type = $result[2];

    // 图片名称
    $filename = time().rand(1000,9999);
    $filename = $filename.rand(10000,99999).".{$type}";
    
    // 保存路径
    $new_file = "../upload/".$filename;
    file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)));
}else{
    $filename = "";
}



$effectiveTime = @strtotime($effectiveTime);
if( !$effectiveTime ) {
    $effectiveTime = 9999999999;
}
if( $creatTime ){
    $creatTime = @strtotime($creatTime);
}else {
    $creatTime = @time();
}


$sql = "insert into t_article (author,category,content,effectiveTime,isTiming,isTop,
only,source,status,title,creatTime,authorPto,keyWord, coverImg) values('$author','$category','$content',
$effectiveTime,'$isTiming','$isTop','$only','$source','$status','$title',$creatTime,'$authorPto','$keyWord','$filename')";

$result = my_exec($sql);

if( $result) {
    $responseStasus = "000";
    $responseMsg = "添加成功";
}

// $responseDate = array( 'author'=>$author, '$category' =>$category,'$content'=>$content
// ,'$effectiveTime'=>$effectiveTime,'$isTiming'=>$isTiming,'$isTop'=>$isTop,'$only'=>$only,'$source'=>$source,
// '$status'=>$status,'$title'=>$title, '$creatTime'=> $creatTime, '$authorPto'=>$authorPto, '$keyWord'=>$keyWord );



$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data' => $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);




?>