<?php

require_once(__DIR__ . "/../model/config.php");
$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
        . "id int(11) NOT NULL AUTO_INCREMENT ,"
        . "title varchar(255) NOT NULL,"
        . "post text NOT NULL,"
        . "PRIMARY KEY (id))");
//creates table for posts on the website


if ($query) {
    echo "succesfully created table:posts";
} else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
    //
}

$query = $_SESSION["connection"]->query("CREATE TABLE users ("
        . "id int(11) NOT NULL AUTO_INCREMENT ,"
        . "username varchar(30) NOT NULL,"
        . "email varchar(50) NOT NULL,"
        . "password char(128) NOT NULL,"
        . "salt char(128) NOT NULL,"
        . "PRIMARY KEY (id))");
//backbone for user database
if ($query) {
    echo "succesfully created table:users";
} else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
