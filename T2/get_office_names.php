<?php
require "db_connection.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT office_id, building_name AS office_name FROM offices_and_distributioncenters";
$result = $conn->query($sql);

$offices = [];
while ($row = $result->fetch_assoc()) {
    $offices[] = $row;  
}

echo json_encode($offices);
?>