-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2025 at 04:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kilburnazon_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit`
--

CREATE TABLE `audit` (
  `employee_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `job_id` varchar(255) NOT NULL,
  `office_id` int(11) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `contract_type` varchar(255) NOT NULL,
  `nin` int(11) NOT NULL,
  `date_joined` date NOT NULL,
  `department_id` int(11) NOT NULL,
  `date_terminated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reason` varchar(255) NOT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `terminator_employee_id` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `audit`:
--

--
-- Dumping data for table `audit`
--

INSERT INTO `audit` (`employee_id`, `name`, `job_id`, `office_id`, `salary`, `date_of_birth`, `contract_type`, `nin`, `date_joined`, `department_id`, `date_terminated`, `reason`, `job_title`, `email`, `terminator_employee_id`) VALUES
(23, 'dakshit', 'ceo', 1, '23456789', '2025-12-19', 'dsfads', 23, '2025-12-25', 1, '2025-12-03 17:44:35', 'dsfa', NULL, NULL, NULL),
(134, 'dakshti', 'ghj', 1, '12345', '2025-12-09', 'fd', 123456, '2025-12-06', 1, '2025-12-03 17:30:04', 'sdf', NULL, NULL, NULL),
(15210392, 'Archie Mongeot', '81', 45, '3300.0000000000005', '2025-10-08', 'Part-time', 0, '2025-06-16', 15, '2025-12-05 02:33:33', 'left the job', 'Full Stack Developer', 'archie@kilburnazon.com', 1213456);

-- --------------------------------------------------------

--
-- Table structure for table `category_and_sub_categories`
--

CREATE TABLE `category_and_sub_categories` (
  `category_name` varchar(255) NOT NULL,
  `sub_categories` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `category_and_sub_categories`:
--

-- --------------------------------------------------------

--
-- Table structure for table `contract_type`
--

CREATE TABLE `contract_type` (
  `contract_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `contract_type`:
--

--
-- Dumping data for table `contract_type`
--

INSERT INTO `contract_type` (`contract_type`) VALUES
('Freelancer'),
('Full-time'),
('Part-time');

-- --------------------------------------------------------

--
-- Table structure for table `customer_address`
--

CREATE TABLE `customer_address` (
  `customer_id` int(11) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `house_number` varchar(255) NOT NULL,
  `street_number` varchar(255) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `customer_address`:
--   `customer_id`
--       `customer_details` -> `customer_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_details`
--

CREATE TABLE `customer_details` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `customer_details`:
--

-- --------------------------------------------------------

--
-- Table structure for table `delivery_run`
--

CREATE TABLE `delivery_run` (
  `delivery_run_id` int(11) NOT NULL,
  `delivery_area` varchar(255) NOT NULL,
  `num_of_products` varchar(255) NOT NULL,
  `vehicle_plate_number` varchar(255) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `office_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `delivery_run`:
--   `employee_id`
--       `employee` -> `employee_id`
--   `office_id`
--       `offices_and_distributioncenters` -> `office_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `number_of_employees` int(11) DEFAULT NULL,
  `department_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `departments`:
--

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `number_of_employees`, `department_name`) VALUES
(11, 20, 'Executives'),
(12, 20, 'Operations'),
(13, NULL, 'Finance'),
(14, 20, 'Marketing'),
(15, NULL, 'Technology');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_information`
--

CREATE TABLE `emergency_information` (
  `employee_id` int(11) NOT NULL,
  `emergency_contact_relationship` varchar(255) DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_number` varchar(255) DEFAULT NULL,
  `emergency_contact_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `emergency_information`:
--   `employee_id`
--       `employee` -> `employee_id`
--

--
-- Dumping data for table `emergency_information`
--

INSERT INTO `emergency_information` (`employee_id`, `emergency_contact_relationship`, `emergency_contact_name`, `emergency_contact_number`, `emergency_contact_id`) VALUES
(14316158, 'mother', '', '07794304300', 7);

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `job_id` int(50) NOT NULL,
  `office_id` int(11) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `contract_type` varchar(255) NOT NULL,
  `nin` varchar(9) NOT NULL,
  `date_joined` date NOT NULL,
  `department_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `employee`:
--   `contract_type`
--       `contract_type` -> `contract_type`
--   `department_id`
--       `departments` -> `department_id`
--   `job_id`
--       `job_roles` -> `job_id`
--   `job_id`
--       `job_roles` -> `job_id`
--   `office_id`
--       `offices_and_distributioncenters` -> `office_id`
--

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `name`, `job_id`, `office_id`, `salary`, `date_of_birth`, `contract_type`, `nin`, `date_joined`, `department_id`, `email`) VALUES
(13619000, 'Hallsy Hitzke', 61, 223, '9271.03', '2025-12-17', 'Part-time', 'jk123533k', '2025-06-09', 13, 'hallsy@kilburnazon.com'),
(14316158, 'Donn Muscat', 91, 67, '6180', '2025-12-16', 'Freelancer', 'kl123456k', '2023-06-14', 12, 'don@kilburnazon.com'),
(15811538, 'Sherye Larrat ', 81, 3, '20000', '2025-12-25', 'Full-time', 'kl909090k', '2025-12-09', 15, 'sherye@kilburnazon.com');

-- --------------------------------------------------------

--
-- Table structure for table `employee_address`
--

CREATE TABLE `employee_address` (
  `employee_id` int(11) NOT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `address_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `employee_address`:
--   `employee_id`
--       `employee` -> `employee_id`
--

--
-- Dumping data for table `employee_address`
--

INSERT INTO `employee_address` (`employee_id`, `postcode`, `address`, `city_name`, `country`, `address_id`) VALUES
(13619000, '1543', '4th trail', 'london', 'UK', 14),
(14316158, '2269', 'marquette terrace', 'manchester', 'UK', 15),
(15811538, 'm14632', 'grove hill', 'manchester', 'UK', 18);

-- --------------------------------------------------------

--
-- Table structure for table `job_roles`
--

CREATE TABLE `job_roles` (
  `job_id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `job_roles`:
--

--
-- Dumping data for table `job_roles`
--

INSERT INTO `job_roles` (`job_id`, `job_title`) VALUES
(11, 'Delivery Driver'),
(21, 'Factory Worker'),
(31, 'Product Designer'),
(51, 'Back End Developer'),
(61, 'Industry Researcher'),
(81, 'Full Stack Developer'),
(91, 'Health & Safety Officer');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturer_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `manufacturer`:
--

-- --------------------------------------------------------

--
-- Table structure for table `offices_and_distributioncenters`
--

CREATE TABLE `offices_and_distributioncenters` (
  `office_id` int(11) NOT NULL,
  `num_of_employees_needed` int(11) NOT NULL,
  `building_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `offices_and_distributioncenters`:
--

--
-- Dumping data for table `offices_and_distributioncenters`
--

INSERT INTO `offices_and_distributioncenters` (`office_id`, `num_of_employees_needed`, `building_name`) VALUES
(1, 234, 'England Central Distribution Centre'),
(2, 23, 'Wales Distribution Centre'),
(3, 23, 'Scotland Distribution Centre'),
(5, 56, 'Northern Ireland Distribution Centre'),
(45, 32, 'Kilburn Building'),
(67, 5, 'Lewis Building'),
(89, 32, 'Broadgate Tower'),
(223, 324, 'England North Distribution Centre'),
(435, 567, 'England South Distribution Centre');

-- --------------------------------------------------------

--
-- Table structure for table `office_address`
--

CREATE TABLE `office_address` (
  `office_id` int(11) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `address_line_1` varchar(255) NOT NULL,
  `address_line_2` varchar(255) NOT NULL,
  `city_name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `office_address`:
--   `office_id`
--       `offices_and_distributioncenters` -> `office_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `review_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `orderitems`:
--   `product_id`
--       `products` -> `product_id`
--   `review_id`
--       `review` -> `review_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `order_id` int(11) NOT NULL,
  `order_date` date DEFAULT NULL,
  `delivery_run_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_delivered` tinyint(1) DEFAULT 0,
  `payment_made` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `order_details`:
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `manufacturer_id` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `num_available_in_stock` int(11) DEFAULT 0,
  `num_of_reviews` int(11) DEFAULT NULL,
  `num_of_answered_questions` int(11) DEFAULT NULL,
  `avg_review_rating` varchar(255) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `products`:
--   `category_name`
--       `category_and_sub_categories` -> `category_name`
--   `manufacturer_id`
--       `manufacturer` -> `manufacturer_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `description_of_review` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `star_rating` varchar(255) DEFAULT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `review`:
--   `order_id`
--       `orderitems` -> `order_id`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit`
--
ALTER TABLE `audit`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `category_and_sub_categories`
--
ALTER TABLE `category_and_sub_categories`
  ADD PRIMARY KEY (`category_name`);

--
-- Indexes for table `contract_type`
--
ALTER TABLE `contract_type`
  ADD PRIMARY KEY (`contract_type`);

--
-- Indexes for table `customer_address`
--
ALTER TABLE `customer_address`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `customer_details`
--
ALTER TABLE `customer_details`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `delivery_run`
--
ALTER TABLE `delivery_run`
  ADD PRIMARY KEY (`delivery_run_id`),
  ADD KEY `fk_office_id` (`office_id`),
  ADD KEY `fk_employee_id` (`employee_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `emergency_information`
--
ALTER TABLE `emergency_information`
  ADD PRIMARY KEY (`emergency_contact_id`),
  ADD KEY `fk_emergency_employee_id5` (`employee_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `fk_contract_type` (`contract_type`),
  ADD KEY `idx_dept_id` (`department_id`),
  ADD KEY `idx_job_id` (`job_id`),
  ADD KEY `idx_office_id` (`office_id`);

--
-- Indexes for table `employee_address`
--
ALTER TABLE `employee_address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `employee_address_ibfk_1` (`employee_id`);

--
-- Indexes for table `job_roles`
--
ALTER TABLE `job_roles`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturer_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `offices_and_distributioncenters`
--
ALTER TABLE `offices_and_distributioncenters`
  ADD PRIMARY KEY (`office_id`);

--
-- Indexes for table `office_address`
--
ALTER TABLE `office_address`
  ADD PRIMARY KEY (`office_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `fk_product_id` (`product_id`),
  ADD KEY `fk_review_id` (`review_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `delivery_run_id` (`delivery_run_id`),
  ADD UNIQUE KEY `customer_id` (`customer_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `fk_manufacturer_id` (`manufacturer_id`),
  ADD KEY `fk_category_name` (`category_name`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `fk_order_id` (`order_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `delivery_run`
--
ALTER TABLE `delivery_run`
  MODIFY `delivery_run_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emergency_information`
--
ALTER TABLE `emergency_information`
  MODIFY `emergency_contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `employee_address`
--
ALTER TABLE `employee_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer_address`
--
ALTER TABLE `customer_address`
  ADD CONSTRAINT `customer_address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_details` (`customer_id`);

--
-- Constraints for table `delivery_run`
--
ALTER TABLE `delivery_run`
  ADD CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_office_id` FOREIGN KEY (`office_id`) REFERENCES `offices_and_distributioncenters` (`office_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `emergency_information`
--
ALTER TABLE `emergency_information`
  ADD CONSTRAINT `fk_emergency_employee_id5` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `fk_contract_type` FOREIGN KEY (`contract_type`) REFERENCES `contract_type` (`contract_type`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_job_id` FOREIGN KEY (`job_id`) REFERENCES `job_roles` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_job_id2` FOREIGN KEY (`job_id`) REFERENCES `job_roles` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_office_id1` FOREIGN KEY (`office_id`) REFERENCES `offices_and_distributioncenters` (`office_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `employee_address`
--
ALTER TABLE `employee_address`
  ADD CONSTRAINT `employee_address_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `office_address`
--
ALTER TABLE `office_address`
  ADD CONSTRAINT `fk_office_id4` FOREIGN KEY (`office_id`) REFERENCES `offices_and_distributioncenters` (`office_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `fk_review_id` FOREIGN KEY (`review_id`) REFERENCES `review` (`review_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category_name` FOREIGN KEY (`category_name`) REFERENCES `category_and_sub_categories` (`category_name`),
  ADD CONSTRAINT `fk_manufacturer_id` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `orderitems` (`order_id`);


--
-- Metadata
--
USE `phpmyadmin`;

--
-- Metadata for table audit
--

--
-- Metadata for table category_and_sub_categories
--

--
-- Metadata for table contract_type
--

--
-- Metadata for table customer_address
--

--
-- Metadata for table customer_details
--

--
-- Metadata for table delivery_run
--

--
-- Metadata for table departments
--

--
-- Metadata for table emergency_information
--

--
-- Metadata for table employee
--

--
-- Metadata for table employee_address
--

--
-- Metadata for table job_roles
--

--
-- Metadata for table manufacturer
--

--
-- Metadata for table offices_and_distributioncenters
--

--
-- Metadata for table office_address
--

--
-- Metadata for table orderitems
--

--
-- Metadata for table order_details
--

--
-- Metadata for table products
--

--
-- Metadata for table review
--

--
-- Metadata for database kilburnazon_data
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
