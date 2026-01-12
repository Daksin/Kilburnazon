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

$employee_id = intval($empId);
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM employee WHERE employee_id = ?");
$stmt->bind_param("i", $employee_id);
$stmt->execute();

$result = $stmt->get_result()->fetch_assoc();

if ($result["count"] == 0) {
    echo json_encode(["error"=> "Employee not found"]);
    exit;
}



$result = $conn->query("
    SELECT 
        e.employee_id AS id,
        e.name AS name,
        e.job_id AS job_id,
        e.office_id AS office_id,
        e.department_id AS department_id,
        j.job_title as job_title,
        d.department_name AS department_name,
        o.building_name AS building_name,
        e.contract_type as contract_type,
        ei.emergency_contact_name,
        ei.emergency_contact_number,
        ei.emergency_contact_relationship,
        a.postcode,
        a.city_name,
        a.address,
        a.country
    FROM employee e
    LEFT JOIN job_roles j 
        ON e.job_id = j.job_id
    LEFT JOIN emergency_information ei
        ON ei.employee_id = e.employee_id  
    LEFT JOIN employee_address a
        ON a.employee_id = e.employee_id  
    LEFT JOIN departments d 
        ON e.department_id = d.department_id
    LEFT JOIN offices_and_distributioncenters o
        ON e.office_id = o.office_id
    WHERE e.employee_id = $empId
");


$row = [];
$row = $result->fetch_assoc();
echo json_encode($row);

?>



    

