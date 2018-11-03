<?php 

include_once './fn.php';
$responseStasus = "222";
$responseMsg = "图片保存失败";
$responseDate = null;



$userid = $_POST['id'];
$base64_image_content = $_POST['filedate'];


if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){

    // 文件类型
    $type = $result[2];

    // 图片名称
    $filename = time().rand(1000,9999);
    $filename = $filename.rand(10000,99999).".{$type}";
    
    // 保存路径
    $new_file = "../upload/".$filename;

    if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
        //    echo '新文件保存成功：', $new_file;

        $sql ="update t_user set photo='$filename' where id=$userid"; 
        $result = my_exec($sql);
        if(  $result ){
            $sql ="SELECT * FROM t_user where id=$userid"; 
            $res = my_query( $sql );
            if( $res ) {
                $responseDate = $res[0];
                $responseStasus = "000";
                $responseMsg = "图片保存成功";
            }
        }

       
    }
}


$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data'=> $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);


?>