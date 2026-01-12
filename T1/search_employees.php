<?php
require "db_connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name       = $data["name"] ?? "";
$dept       = $data["dept"] ?? null;
$year       = $data["year"] ?? null;
$job        = $data["job"] ?? null;
$location   = $data["location"] ?? null;
$nametype = "%".$name."%";
$deptPattern = "%".$name."%"; 

$query = "
SELECT 
    e.employee_id AS id, 
    e.name 
FROM employee e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE 
    (e.name LIKE ? OR d.department_name LIKE ?)
    AND (? IS NULL OR e.department_id = ?)
    AND (? IS NULL OR YEAR(e.date_joined) = ?)
    AND (? IS NULL OR e.job_id = ?)
    AND (? IS NULL OR e.office_id = ?)";

$stmt = $conn->prepare($query);
$stmt->bind_param(
    "ssiiiissss",
    $nametype, $deptPattern,
    $dept, $dept,  
    $year, $year, 
    $job, $job,
    $location, $location  
);

$stmt->execute();
$result = $stmt->get_result();

$employees = [];
while ($row = $result->fetch_assoc()) {
    $employees[] = $row;
}
// if (count($employees) == 0) {
//     echo json_encode("No employees to display");
//     exit;
// }

echo json_encode($employees);
