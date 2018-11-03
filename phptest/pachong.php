<?php

header("Content-type: text/html; charset=utf-8");
//爬虫类
class Crawler{
    private $url;
    public function __construct($url){
        if(!preg_match("/^(http)s?/", $url)){
            $url = "http://".$url;
        }
        $this->url = $url;
    }
    //从给定的url中获取html内容
    protected function _getUrlContent($url){
        @$handle = fopen($url, "r");
        if(error_get_last()){//捕获异常（不一定是错误）
            $err = new Exception("你的URL好像不对！要不换一个？");
            echo $err->getMessage();
            return;
        }
        if($handle){
            $content = stream_get_contents($handle,1024*1024);//将资源流读入字符串
            return $content;
        }else{
            return false;
        }   
    }
    //从html内容中筛选链接
    protected function _filterUrl($web_content){
        $reg_tag_a = '/<[a|A].*?href=[\'\"]{0,1}([^>\'\"\ ]*).*?>/';
        $result = preg_match_all($reg_tag_a,$web_content,$match_result);
        if($result){
            return $match_result[1];
        }
    }
    //判断是否是完整的url
    protected function _judgeURL($url){
        $url_info = parse_url($url);
        if(isset($url_info['scheme'])||isset($url_info['host'])){
            return true;
        }
        return false;
    }
    //修正相对路径
    protected function _reviseUrl($base_url,$url_list){
        $url_info = parse_url($base_url);//分解url中的各个部分
        unset($base_url);
        $base_url = isset($url_info["scheme"])?$url_info["scheme"].'://':"";//$url_info["scheme"]为http、ftp等
        if(isset($url_info["user"]) && isset($url_info["pass"])){//记录用户名及密码的url
            $base_url .= $url_info["user"].":".$url_info["pass"]."@";
        }
        $base_url .= isset($url_info["host"])?$url_info["host"]:"";//$url_info["host"]域名
        if(isset($url_info["port"])){//$url_info["port"]端口，8080等
            $base_url .= ":".$url_info["port"];
        }
        $base_url .= isset($url_info["path"])?$url_info["path"]:"";//$url_info["path"]路径
        //目前为止，绝对路径前面已经组装完
        if(is_array($url_list)){
            foreach ($url_list as $url_item) {
                // if(preg_match('/^(http)s?/',$url_item)){
                if($this->_judgeURL($url_item)){
                    //已经是完整的url
                    $result[] = $url_item;
                }else {
                    //不完整的url
                    $real_url = $base_url.$url_item;
                    $result[] = $real_url;
                }
            }
            return $result;
        }else {
            return;
        }
    }
    //爬虫
    public function crawler(){
        $content = $this->_getUrlContent($this->url);
        if($content){
            $url_list = $this->_reviseUrl($this->url,$this->_filterUrl($content));
            if($url_list){
                return $url_list;
            }else {
                return ;
            }
        }else{
            return ;
        }
    }
}


$fp_puts = fopen("url.txt","ab");//记录url列表
$fp_gets = fopen("url.txt","r");//保存url列表
$current_url = "www.baidu.com";
$num = 0;
do{
    $num = $num + 1;
    $Crawler = new Crawler($current_url);
    $url_arr = $Crawler->crawler();
    if($url_arr){
        foreach ($url_arr as $url) {
            fputs($fp_puts,$url."\n");
        }
    }
}while ($num<10);//不断获得url


echo "<pre>";
var_dump($url_arr);
echo "<pre/>";

?>

