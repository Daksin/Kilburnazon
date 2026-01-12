<?php
require "db_connection.php";  

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"), true);


$rows =[]; 
// check if employee exists
date_default_timezone_set('GMT');
$year = date("Y");
$result = $conn->query("SELECT employee_id AS id, name AS name, DATE(date_terminated) AS date_deleted
        FROM audit");


while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}
echo json_encode($rows);


?>
