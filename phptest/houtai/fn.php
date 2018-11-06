<?php 

header('content-type:text/html;charset=utf-8');

define('ROOT','127.0.0.1');
define('UNM','root');
// define('UPWD','root');
define('UPWD','nishisb');
define('TBNM','news-websit');


//修改添加删除
function my_exec($sql){
    $link=@mysqli_connect(ROOT,UNM,UPWD,TBNM);
    if( !$link ){
    //    echo '数据库连接失败'; 
       return false;
    }
    if( !mysqli_query($link,$sql) ){
        // echo '操作失败'.mysqli_error($link); 
        mysqli_close($link);
        return false;
    }
    mysqli_close($link);
    return true;
}
//查询
function my_query($sql){
    $link=@mysqli_connect(ROOT,UNM,UPWD,TBNM);
    if( !$link ){
    //    echo '数据库连接失败'; 
       return false;
    }
    $res=mysqli_query($link,$sql);
    if( !$res || mysqli_num_rows($res)<= 0 ){
        // echo '没有查到数据'.mysqli_error($link); 
        mysqli_close($link);
        return false;
    } 
    while( $r = mysqli_fetch_assoc($res) ){
        $info[]=$r;
    }
    mysqli_close($link);
    return $info;   
}
//时候登录状态
function isLoaded(){
    session_start();
    if( !$_SESSION['user_id'] ){
        header('location:./login.php');
        die();
    }
}
//生成唯一ID；
function create_guid($namespace = '') { 
    static $guid = '';
    $uid = uniqid("", true);
    $data = $namespace;
    $data .= $_SERVER['REQUEST_TIME'];
    $data .= $_SERVER['HTTP_USER_AGENT'];
    $data .= @$_SERVER['LOCAL_ADDR'];
    $data .= @$_SERVER['LOCAL_PORT'];
    $data .= $_SERVER['REMOTE_ADDR'];
    $data .= $_SERVER['REMOTE_PORT'];
    $hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
    $guid = '{' .
        substr($hash, 0, 8) .
        '-' .
        substr($hash, 8, 4) .
        '-' .
        substr($hash, 12, 4) .
        '-' .
        substr($hash, 16, 4) .
        '-' .
        substr($hash, 20, 12) .
        '}';
    return $guid;
   }

   //生成唯一分类；
function create_type($namespace = '') { 
    static $guid = '';
    $uid = uniqid("", true);
    $data = $namespace;
    $data .= $_SERVER['REQUEST_TIME'];
    $data .= $_SERVER['HTTP_USER_AGENT'];
    $data .= @$_SERVER['LOCAL_ADDR'];
    $data .= @$_SERVER['LOCAL_PORT'];
    $data .= $_SERVER['REMOTE_ADDR'];
    $data .= $_SERVER['REMOTE_PORT'];
    $hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
    $guid = substr($hash, 0, 8).substr($hash, 8, 4).substr($hash, 12, 4);
    return $guid;
   }

?>