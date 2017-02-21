<?php
    $con = mysql_connect("localhost","root","");
    if (!$con)
    {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db("project", $con);


    $result = mysql_query("SELECT * FROM info WHERE id=10");

    // $row = mysql_fetch_array($result);

    while($row = mysql_fetch_array($result))
    {
        $sql="INSERT INTO info1 (user_id, name_chinese, name_english, name, phone, address) VALUES ('$row[user_id]', '$row[name_chinese]', '$row[name_english]', '$row[name]', '$row[phone]', '$row[address]')";
        mysql_query('SET NAMES utf8');
        if (!mysql_query($sql,$con))
        {
          die('Error: ' . mysql_error());
        }
        echo $row[name];
    }

    mysql_close($con);
?>

$con = mysql_connect("localhost","root","");
if (!$con)
{
    die('Could not connect: ' . mysql_error());
}

mysql_select_db("project", $con);
$result = mysql_query("SELECT * FROM info WHERE id=10");
while($row = mysql_fetch_array($result))
{
    echo $row[user_id];
    echo "<br />";
    echo $row[name_chinese];
    echo "<br />";
    echo $row[name_english];
    echo "<br />";
    echo $row[name];
    echo "<br />";
    echo $row[phone];
    echo "<br />";
    echo $row[address];
}

mysql_close($con);
<!-- CREATE TABLE `info1` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `user_id` integer NOT NULL,
    `name_chinese` varchar(256),
    `name_english` varchar(256),
    `name` varchar(256),
    `phone` varchar(256),
    `address` varchar(256)
); -->
