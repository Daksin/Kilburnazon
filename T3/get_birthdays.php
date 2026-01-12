<?php
// not in use
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

header("Content-Type: application/json");

include "db_connection.php";

// $deptId = $_GET['id'] ?? '';
// if ($deptId === '') {
//     echo json_encode([]);
//     exit;
// }
date_default_timezone_set('GMT');
$month = date("m");
$rows = [];


$result = $conn->query("SELECT employee_id AS id, name AS name, date_of_birth AS dob
        FROM employee 
        WHERE MONTH(date_of_birth) = $month");


while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
?>



    

