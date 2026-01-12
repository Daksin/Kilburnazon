<?php
require "db_connection.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT contract_type FROM contract_type";
$result = $conn->query($sql);

$offices = [];
while ($row = $result->fetch_assoc()) {
    $offices[] = $row;  
}

echo json_encode($offices);
?>