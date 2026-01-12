<?php
require "db_connection.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT building_name AS building_name, office_id AS office_id FROM offices_and_distributioncenters";
$result = $conn->query($sql);

$locations = [];
while($row = $result->fetch_assoc()) {
    $locations[] = $row;
}

echo json_encode($locations);
?>
