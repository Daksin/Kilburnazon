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
$name = $data["name"];
$job_id = $data["job_id"];
$office_id = $data["office_id"];
$department_id = $data["department_id"];    
$contract_type = $data["contract_type"];
$pay_rise = intval($data["pay_rise"]);
$emergency_contact_name = $data["emergency_contact_name"];
$emergency_contact_number = $data["emergency_contact_number"];
$emergency_contact_relationship = $data["emergency_contact_relationship"];
$address = $data["address"];
$postcode = $data["postcode"];
$city = $data["city"];
$country = $data["country"];

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

// // Check if department exists

// $department_id = intval($data["department_id"]);
// $stmt1 = $conn->prepare("SELECT COUNT(*) AS count FROM departments WHERE department_id = ?");
// $stmt1->bind_param("i", $department_id);
// $stmt1->execute();
// $result1 = $stmt1->get_result()->fetch_assoc();

// if ($result1["count"] == 0) {
//     echo json_encode("department does not exist");
//     exit;
// }
// // Check if office exists

// $office_id = intval($data["office_id"]);
// $stmt2 = $conn->prepare("SELECT COUNT(*) AS count FROM offices_and_distributioncenters WHERE office_id = ?");
// $stmt2->bind_param("i", $office_id);
// $stmt2->execute();
// $result2 = $stmt2->get_result()->fetch_assoc();

// if ($result2["count"] == 0) {
//     echo json_encode("office does not exist");
//     exit;
// }


// check promoted and then do salary update

if($pay_rise != 0){

    $salary_old_stmt = $conn->prepare("SELECT salary FROM employee WHERE employee_id = ?");
    $salary_old_stmt->bind_param("i", $employee_id);
    $salary_old_stmt->execute();
    $salary_old_result = $salary_old_stmt->get_result()->fetch_assoc();
    $new_salary = $salary_old_result["salary"] * (($pay_rise/100) + 1.0);
    // $salary_formatted = number_format($new_salary, 2);
    $stmt4 = $conn->prepare("UPDATE employee SET salary = ? WHERE employee_id = ?");
    $stmt4->bind_param("di", $new_salary, $employee_id);
    $stmt4->execute();
    if ($stmt4->execute()) {
        // echo json_encode("Promotion applied and salary increased by 7% n");
    } else {
        echo json_encode("Salary change failed");
    }
}



$stmt3 = $conn->prepare("UPDATE employee SET 
    name = ?,   
  job_id = ?,
  office_id = ?,
  department_id = ?,
    contract_type = ?
  WHERE employee_id = ?");

    $stmt3->bind_param(
        "ssiisi",   
        $name, 
        $job_id, 
        $office_id, 
        $department_id, 
        $contract_type, 
        $employee_id
    );

$stmt4 = $conn->prepare("UPDATE emergency_information SET 
    emergency_contact_relationship = ?,   
  emergency_contact_number = ?,
  emergency_contact_name = ?
  WHERE employee_id = ?");

    $stmt4->bind_param(
        "sssi",   
        $emergency_contact_relationship, 
        $emergency_contact_number, 
        $emergency_contact_name, 
        $employee_id
    );


$stmt5 = $conn->prepare("UPDATE employee_address SET 
    address = ?,   
  city_name = ?,
  country = ?,
  postcode = ?
  WHERE employee_id = ?");

    $stmt5->bind_param(
        "ssssi",   
        $address, 
        $city, 
        $country, 
        $postcode,
        $employee_id
    );


    if ($stmt3->execute() && $stmt4->execute()&& $stmt5->execute()) {
        echo json_encode("Employee details changed successfully");
    } else {
        echo json_encode("Change failed");
    }

?>
