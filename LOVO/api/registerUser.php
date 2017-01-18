<?php
    header("Content-type:text/html;charset=utf-8");
    function doPost(){
        $success=0;
        $conn=new mysqli("localhost","root","","usercenter");
        mysqli_query($conn,"set character set 'utf8'");//读库
        mysqli_query($conn,'set names utf8');//写库
        $value="'".$_POST["name"]."','".$_POST["password"]."'";
        if($conn->query("insert into t_user (name,password) values (".$value.");")==true){
            $success=1;
        }
        $conn->close();
        echo $success;
    }
    doPost();
?>