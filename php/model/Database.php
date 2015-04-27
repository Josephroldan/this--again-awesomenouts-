<?php

class Database {

    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;
//can be accessed outside if public and can't if privaate  
    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;


        $this->connection = new mysqli($host, $username, $password);

        if ($this->connection->connect_error) {
            die("<p>ERROR: " . $this->connection->connect_error . "</p>");
        } else {
            
        }
        $exists = $this->connection->select_db($database);


        if (!$exists) {
            echo 'database doesnt exist';
            $query = $this->connection->query("CREATE DATABASE $database");
            //code tells if the database does not exist 
            if ($query) {
                echo "<p>database creation succesful noobs " . $database . "</p>";
            }
        } else {
            echo "<p>data base already exists</p>";
        }
    }

    public function openConnection() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->connection->connect_error) {
            die("<p>ERROR: " . $this->connection->connect_error . "</p>");
        }
    }

    public function closeConnection() {
        if (isset($this->connection)) {
            $this->connection->close();
        }
    }

    public function query($string) {
        $this->openConnection();
        $query = $this->connection->query($string);

        if (!$query) {
            $this->error = $this->connection->error;
        }

        $this->closeConnection();
        return $query;
    }

}
