<?php
    $con = mysql_connect("localhost","root","");
    if (!$con)
    {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db("project", $con);

    $result = mysql_query("SELECT * FROM info WHERE user_id='$_GET[user_id]'");

    // $row = mysql_fetch_array($result);

    while($row = mysql_fetch_array($result))
    {
        echo $row['user_id'];
    }

    mysql_close($con);
?>I
