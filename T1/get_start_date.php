<?php
require "db_connection.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$query = "SELECT DISTINCT YEAR(date_joined) AS year FROM employee ORDER BY year DESC";
$result = $conn->query($query);

$years = [];
while($row = $result->fetch_assoc()) {
    $years[] = $row['year'];
}

echo json_encode($years);
?>
