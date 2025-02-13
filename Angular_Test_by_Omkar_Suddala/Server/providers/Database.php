<?php

namespace App\Providers;

use App\Environment;

class Database
{
    private $pdo = null;
    public function __construct()
    {
        $env = Environment::get();
        $host = $env['DB_HOST'];
        $db = $env['DB_NAME'];
        $user = $env['DB_USER'];
        $pass = $env['DB_PASS'];
        $port = $env['DB_PORT'];
        $this->pdo = new \PDO("pgsql:host=$host;dbname=$db;port=$port", $user, $pass);
    }

    public function select($query)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function first($query, $params)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->fetch();
    }
    public function getAll($query,$params)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
    public function getAllPost($query)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function insert($query, $params)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        return $this->pdo->lastInsertId();
    }

    public function update($query, $params)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    public function delete($query, $params)
    {
        $stmt = $this->pdo->prepare($query);
        $stmt->execute($params);
        return $stmt->rowCount();
    }
}
