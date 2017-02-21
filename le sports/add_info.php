<?php
    $con = mysql_connect("localhost","root","");
    if (!$con)
    {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db("project", $con);

    $sql="INSERT INTO info (user_id, name_chinese, name_english, name, phone, address) VALUES ('$_POST[user_id]', '$_POST[name_chinese]', '$_POST[name_english]', '$_POST[name]', '$_POST[phone]', '$_POST[address]')";

    if (!mysql_query($sql,$con))
    {
      die('Error: ' . mysql_error());
    }
    echo "1 record added";
    mysql_close($con);
?>I
