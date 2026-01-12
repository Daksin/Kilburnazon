<?php
include "db_connection.php";

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");



$empId = $_GET['id'] ?? '';
if ($empId === '') {
    echo json_encode([]);
    exit;
}
$result = $conn->query("
    SELECT 
        e.employee_id AS id,
        e.name AS name,
        e.job_id AS job_id,
        e.office_id AS office_id,
        e.department_id AS department_id,
        e.salary AS salary,
        e.date_of_birth AS dob,
        e.nin AS nin, 
        e.email AS email,
        j.job_title as job_title,
        e.date_joined AS date_joined,
        d.department_name AS department_name,
        o.building_name AS building_name,
        e.contract_type as contract_type
    FROM employee e
    LEFT JOIN departments d 
        ON e.department_id = d.department_id
    LEFT JOIN job_roles j 
        ON e.job_id = j.job_id
    LEFT JOIN offices_and_distributioncenters o
        ON e.office_id = o.office_id
    WHERE e.employee_id = $empId
");



$row = $result->fetch_assoc();
echo json_encode($row);

?>



    

