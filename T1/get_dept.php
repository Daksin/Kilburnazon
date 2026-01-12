<?php
include "db_connection.php";
require "db_connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

header("Content-Type: application/json");

include "db_connection.php";

$result = $conn->query("SELECT department_id AS id, department_name AS title FROM departments");


$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
?>



    

