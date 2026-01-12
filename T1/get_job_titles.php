<?php
require "db_connection.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$sql = "SELECT job_id as job_id, job_title as job_title FROM job_roles";
$result = $conn->query($sql);

$titles = [];
while($row = $result->fetch_assoc()) {
    $titles[] = $row;
}

echo json_encode($titles);
?>
