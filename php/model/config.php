<?php

require_once(__DIR__ . "/database.php");
//pulls data from database.php
session_start();
session_regenerate_id(true);

$path = "/newAwesomenaughts/php/";
//sets path of data
$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";
//determines what each variable represents
if (!isset($_SESSION["connection"])) {
    //transfers data to session connection
    $connection = new Database($host, $username, $password, $database);
    $_SESSION["connection"] = $connection;
}