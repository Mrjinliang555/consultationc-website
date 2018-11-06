<?php 

include_once './fn.php';
$responseStasus = "222";
$responseMsg = "图片保存失败";
$responseDate = null;


$base64_image_content = $_POST['imgdata'];


if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){

    // 文件类型
    $type = $result[2];

    // 图片名称
    $filename = time().rand(1000,9999);
    $filename = $filename.rand(10000,99999).".{$type}";
    
    // 保存路径
    $new_file = "../upload/".$filename;

    if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){

        $title = $_POST["title"];
        $link = $_POST["link"];
        //    echo '新文件保存成功：', $new_file;

        $sql ="insert into t_bannerlist(title,link,imgsrc) values('$title','$link','$filename')"; 
        $result = my_exec($sql);
        if(  $result ){
            $responseStasus = "000";
            $responseMsg = "图片保存成功";
        }

       
    }
}


$responseInof = array('code' => $responseStasus ,'msg'=> $responseMsg, 'data'=> $responseDate );
echo json_encode( $responseInof  ,JSON_UNESCAPED_UNICODE);














?>