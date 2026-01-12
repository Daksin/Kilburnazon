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

$employee_id   = $data["employee_id"];
$reason = $data["reason"];
$terminator_employee_id = $data["terminator_employee_id"];


if (!$data) {
    echo json_encode(["error" => "No JSON data received"]);
    exit;
}

$empId = $_GET['employee_id'] ?? '';
if ($empId === '') {
    echo json_encode([]);
    exit;
}

// check if employee existsS
$employee_id = intval($data["employee_id"]);
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM employee WHERE employee_id = ?");
$stmt->bind_param("i", $employee_id);
$stmt->execute();

$result = $stmt->get_result()->fetch_assoc();

if ($result["count"] == 0) {
    echo json_encode("Employee not found");
    exit;
}

$stmt1 = $conn->prepare("
    INSERT INTO audit 
    (
        employee_id,
        contract_type,
        salary,
        name,
        nin,
        job_id,
        job_title,
        office_id,
        date_of_birth,
        email,
        date_joined,
        department_id,
        date_terminated,
        reason,
        terminator_employee_id
    )
    SELECT 
        e.employee_id,
        e.contract_type,
        e.salary,
        e.name,
        e.nin,
        e.job_id,
        j.job_title,
        e.office_id,
        e.date_of_birth,
        e.email,
        e.date_joined,
        e.department_id,
        CURRENT_TIMESTAMP(),
        ?,
        ?
    FROM employee e
    LEFT JOIN job_roles j 
        ON e.job_id = j.job_id
    WHERE e.employee_id = ?
");

$stmt1->bind_param("sii", $reason,$terminator_employee_id, $employee_id);

if (!$stmt1->execute()) {
    echo json_encode("fail");
    exit;
}


$stmt2 = $conn->prepare("DELETE FROM employee WHERE employee_id = ?");
$stmt2->bind_param("i", $employee_id);
if ($stmt2->execute()) {
    echo ("Employee deleted successfully");
} else {
    echo json_encode("Employee deletion failed");
}

?>
