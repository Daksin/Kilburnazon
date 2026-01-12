# Kilburnazon
Kilburnazon is a full-stack web application developed as part of a Database Systems coursework project.
The system simulates an internal employee management and logistics platform, with a strong focus on relational database design, query optimisation, and efficient data retrieval.

The project demonstrates practical application of database theory through indexing, complex joins, and scalable CRUD operations exposed via RESTful APIs.


# Features
## Employee Management System

- Create, read, update, and delete employee records
- Multi-filter employee search (department, role, location, etc.)
- Dynamic frontend updates without page reloads

## Optimised Database Design

- Normalised relational schema in MySQL
- Use of B-Tree indexing to significantly reduce query latency
- Efficient JOIN operations across multiple tables

## RESTful API Architecture
- PHP backend exposing REST endpoints
- Clear separation between frontend and backend concerns
- Sub-second response times for common queries

## Frontend UI
- Built with React
- Modular component-based design
- CSS-based visual cues to improve usability and navigation speed

## Automated Data Maintenance
- SQL routines to remove archived records older than three years
- Ensures long-term database efficiency and storage optimisation

# Tech Stack
## Frontend
- React

- JavaScript

- HTML5

- CSS3

## Backend

- PHP

- RESTful APIs

## Database

- MySQL

# Installation & Setup
## Prerequisites
- PHP 8+
- MySQL 8+
- Node.js & npm
- Web server (Apache / Nginx / XAMPP / MAMP)
## Steps
1) Clone the repository
2) Database setup
    - Import the provided SQL schema into MySQL
    - Configure database credentials in the PHP backend
    
3) Backend
    - Place backend files in your server’s root directory
    - Ensure PHP extensions for MySQL are enabled

4) Frontend
    - Navigate to the frontend branch
    - run 'npm install'
    - run 'npm start'
    
5) Access
    - Frontend: http://localhost:3000
    - Backend API: http://localhost/api/...
# Future Improvements
- Authentication and role-based access control
- Pagination and server-side filtering
- Caching frequently accessed queries
- Dockerised deployment
# Author
Dakshit Singhal
BSc (Hons) Computer Science
University of Manchester
