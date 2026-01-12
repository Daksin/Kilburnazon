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
$salary = $data["salary"];
$dob = $data["dob"];
$contract_type = $data["contract_type"];
$nin = $data["nin"];
$email = $data["email"];
$date_joined = $data["date_joined"];
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

// Check if employee already exists 
$employee_id = intval($data["employee_id"]);
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM employee WHERE employee_id = ?");
$stmt->bind_param("i", $employee_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

if ($result["count"] > 0) {
    echo json_encode("Employee already exists");
    exit;
}



$stmt2 = $conn->prepare("
    INSERT INTO `employee`
    (`employee_id`, `name`, `job_id`, `office_id`,`department_id`,
     `salary`,`nin`, `contract_type`, `date_joined`,`date_of_birth`, `email`) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt2->bind_param(
    "issiiisssss",   
    $employee_id, 
    $name, 
    $job_id, 
    $office_id, 
    $department_id, 
    $salary, 
    $nin, 
    $contract_type, 
    $date_joined, 
    $dob, 
    $email
);




if ($stmt2->execute()) {
    echo json_encode("Employee added successfully");

    // insert address
    $stmt5 = $conn->prepare("
        INSERT INTO employee_address
        (employee_id, address, city_name, country, postcode)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt5->bind_param(
        "issss",
        $employee_id,
        $address,
        $city,
        $country,
        $postcode
    );

    $stmt5->execute();

// insert emergency info
    if (
    $emergency_contact_name === '' &&
    $emergency_contact_number === '' &&
    $emergency_contact_relationship === ''
) {

} else {

    $stmt = $conn->prepare("
        INSERT INTO emergency_information
        (employee_id, emergency_contact_name, emergency_contact_number, emergency_contact_relationship)
        VALUES (?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "isss",
        $employee_id,
        $emergency_contact_name,
        $emergency_contact_number,
        $emergency_contact_relationship
    );

    $stmt->execute();
    
}
} else {
    echo "Insert failed: " . $stmt2->error;
    echo json_encode("Failed to add employee");
}
?>
