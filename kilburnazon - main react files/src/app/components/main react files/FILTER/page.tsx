'use client';

import { useState, useEffect } from "react";
import Sidebar from '../../Sidebar';
import styles from "./form.module.css";
import { TextField } from "@mui/material";



type Item = {id: string, name:string, job:string};
type deptTitle = {
  id: string;
  title: string;
};
type Emp = {
  id: string;
  name: string;
  job_title: string;
  office_id: string;
  // salary:string;
  dob: string;
  // nin: string; 
  email: string;
  date_joined : string;
  department_id : string;
  department_name: string;
  building_name: string;
  contract_type: string;
};

export default function HomePage(){
  // const [items, setItems] = useState<Item[]>([]);
  
  // dropdown state
  const [showDropdown, setShowDropdown] = useState(true);



  // const [empDept, setempDept] = useState<Item[]>([]);
  // const [showEmployeeMenu, setShowEmployeeMenu] = useState(false);

// year states
  const [activeYear, setActiveYear] = useState<string | null>(null);
    const [selectedYear, setYearName] = useState<string>("");
  const [showYearSubmenu, setYearShowSubmenu] = useState(false);
  const [years, setYears] = useState<number[]>([]);


  // emp details states
  const [activeEmp, setActiveEmp] = useState<string | null>(null);
  const [showEmployeeDetailsMenu, setShowEmployeeDetailsMenu] = useState(false);
  const [empDetails, setEmpDetails] = useState<Emp | null>(null);

  const [inputText, setInputText] = useState("");

  // dept states
    const [deptTitles, setdeptTitles] = useState<deptTitle[]>([]);
  const [selectedDept, setDeptName] = useState<string>("");
    const [showDeptSubmenu, setDeptShowSubmenu] = useState(false);

  const [activeDept, setActiveDept] = useState<string | null>(null);

  // job titles states
const [activeJob, setActiveJob] = useState<string | null>(null);
const [selectedJob, setJobName] = useState<string>("");
const [showJobSubmenu, setShowJobSubmenu] = useState(false);
const [titles, setTitles] = useState<{ job_id: string; job_title: string }[]>([]);

//  location states
const [activeLocation, setActiveLocation] = useState<string | null>(null);
const [selectedLocation, setLocationName] = useState<string>("");
const [showLocationSubmenu, setShowLocationSubmenu] = useState(false);
const [locations, setLocations] = useState<{ building_name: string; office_id: string }[]>([]);

// search states
const [searchResults, setSearchResults] = useState<Item[]>([]);





const fetchYears = async () => {
  try {
    const res = await fetch("http://localhost/api_calls_kilburnazon/T1/get_start_date.php");
    const data = await res.json();
    setYears(data);
  } catch (err) {
    console.error("Failed to load years:", err);
  }
};

const fetchLocations = async () => {
  try {
    const res = await fetch("http://localhost/api_calls_kilburnazon/T1/get_locations.php");
    const data = await res.json();
    setLocations(data);
  } catch (err) {
    console.error("Failed to load office locations:", err);
  }
};

useEffect(() => {
  fetchLocations();
}, []);


const fetchJobTitles = async () => {
  try {
    const res = await fetch("http://localhost/api_calls_kilburnazon/T1/get_job_titles.php");
    const data = await res.json();
    setTitles(data);
  } catch (err) {
    console.error("Failed to load job titles:", err);
  }
};

useEffect(() => {
  fetchJobTitles();
}, []);


useEffect(() => {
  fetchYears();
}, []);



  let inputHandler = (e) => {
    //convert to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const fetchEmpData = async (empId: string)=>{
    try{
    const res = await fetch(`http://localhost/api_calls_kilburnazon/get_employees_data.php?id=${empId}`);

     const data = await res.json();
      setEmpDetails(data);
    setShowEmployeeDetailsMenu(true);
    } catch (error) {
      console.error("Failed to load employee details:", error);
    }
  }

   const fetchdeptTitles = async () => {
      try {
        const res = await fetch("http://localhost/api_calls_kilburnazon/T1/get_dept.php");
        const data = await res.json()
        setdeptTitles(data);
      } catch (error) {
        console.error("Failed to load dept titles:", error);
      }
    };

    useEffect(() => {
      fetchdeptTitles();
    }, []);


const clearPage = () => {
  setSearchResults([]);
  // setShowDropdown(false); 
    
    setDeptName("");
    setYearName("");
    setJobName("");
    setLocationName("");
    setActiveDept (null);
    setActiveYear (null);
    setActiveJob (null);
    setActiveLocation (null);
};  



  const handleSearch = async () => {
    try {
      const res = await fetch("http://localhost/api_calls_kilburnazon/T1/search_employees.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inputText,
          dept: activeDept,
          year: activeYear,
          job: activeJob,
          location: activeLocation
        })
        
      });

      const data = await res.json();
      setSearchResults(data);
      setInputText("");
    } catch (err) {
      console.error("Search failed:", err);
      
    }
  };




  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
 
  }

  

  return (
  <div>
    <p style={{ fontFamily: "Lato" }}>Fetch all employees based on the filter criteria</p>
      {/* search container */}
      <div className={styles.searchContainer}>
        <div className="search">
                <TextField
                  id="outlined-basic"
                  value = {inputText}
                  onChange={inputHandler}
                  variant="outlined"
                  style = {{width:" 800px"}}
                  label="Enter employee name"
                />
              </div>


                  {/* search button */}
              <button
                  onClick={handleSearch}
                  className={styles.searchbtn}
                  style={{ fontFamily: "monospace", width: "200px" }}
                >
                  search
                </button>

        </div>

    {/* display container */}
  <div className={styles.resultsSection}>
    
    {/* filter button dropdown */}
  <div className={styles.filterColumn}>
    <div className={styles.dropdownContainer}>
      <button
        onClick={toggleDropdown}
        className={styles.dropbtn}
        style={{ fontFamily: "monospace", width: "200px" }}
      >
        FILTER
      </button>

      {/* all subitems */}
      {showDropdown && (
        <div className={styles.dropdown}>

      {/* dept subnav */}
          <div
                className={styles.subnavItem}
                onMouseEnter={() => setDeptShowSubmenu(true)}
                onMouseLeave={() => {
                  setDeptShowSubmenu(false);
                  // setShowEmployeeMenu(false);
                }}
              >
                <span
                  onClick={() => setDeptShowSubmenu(prev => !prev)}
                  className={styles.selectedsubitem}
                >
                  {selectedDept ? `Department: ${selectedDept}` : "Department ▸"}
                </span>

                {showDeptSubmenu && (
                  <div className={styles.submenu}>
                    {deptTitles.map(dept => (
                      <div
                        key={dept.id}
                        className={styles.subnavItem}
                        onClick={() => {
                          setDeptName(dept.title);
                          setActiveDept(dept.id);
                          // fetchempDept(dept.id);
                          setDeptShowSubmenu(false);
                        }}
                      >
                        {dept.title}
                  </div>
                ))}
              </div>
            )}
          </div>

         {/* start date sub nav */}
          <div
                className={styles.subnavItem}
                onMouseEnter={() => setYearShowSubmenu(true)}
                onMouseLeave={() => {
                  setYearShowSubmenu(false);
                  // setShowEmployeeMenu(false);
                }}
              >
                <span
                  onClick={() => setYearShowSubmenu(prev => !prev)}
                  className={styles.selectedsubitem}
                >
                  {selectedYear ? `Start_Date: ${selectedYear}` : "Date Joined ▸"}
                </span>

                {showYearSubmenu && (
                  <div className={styles.submenu}>
                    {years.map(year => (
                      <div
                        key={year}
                        className={styles.subnavItem}
                        onClick={() => {
                          setYearName(year.toString());
                          setActiveYear(year.toString());
                          // fetchempDept(dept.id);
                          setYearShowSubmenu(false);
                        }}
                      >
                        {year}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          
          {/* job ttiles sub nav */}
            <div
              className={styles.subnavItem}
              onMouseEnter={() => setShowJobSubmenu(true)}
              onMouseLeave={() => setShowJobSubmenu(false)}
            >
              <span
                onClick={() => setShowJobSubmenu(prev => !prev)}
                className={styles.selectedsubitem}
              >
                {selectedJob ? `Job Title: ${selectedJob}` : "Job Title ▸"}
              </span>

              {showJobSubmenu && (
                <div className={styles.submenu}>
                  {titles.map(title => (
                    <div
                      key={title.job_id}
                      className={styles.subnavItem}
                      onClick={() => {
                        setJobName(title.job_title);
                        setActiveJob(title.job_id);
                        setShowJobSubmenu(false);
                      }}
                    >
                      {title.job_title}
                    </div>
                  ))}
                </div>
              )}
            </div>


          {/* location sub nav */}
            <div
              className={styles.subnavItem}
              onMouseEnter={() => setShowLocationSubmenu(true)}
              onMouseLeave={() => setShowLocationSubmenu(false)}
            >
              <span
                onClick={() => setShowLocationSubmenu(prev => !prev)}
                className={styles.selectedsubitem}
              >
                {selectedLocation ? `Location: ${selectedLocation}` : "Offices ▸"}
              </span>

              {showLocationSubmenu && (
                <div className={styles.submenu}>
                  {locations.map(loc => (
                    <div
                      key={loc.office_id}
                      className={styles.subnavItem}
                      onClick={() => {
                        setLocationName(loc.building_name);
                        setActiveLocation(loc.office_id);
                        setShowLocationSubmenu(false);
                      }}
                    >
                      {loc.building_name}
                    </div>
                  ))}
                </div>
              )}
            </div>

      </div>
      )}
    </div>
    </div>
    <div className={styles.resultsColumn}>
        <div> 
        <button
            type="button"
            className={styles.button}
            style={{ fontFamily: "monospace" }}
            onClick={() => {
              clearPage();
            }}
          >
            CLEAR
          </button>


        </div>
        {searchResults.map(emp => (
              <div key={emp.id} style={{ position: "relative" }} >
               {/* search button */}
                <button 
                  className={styles.empbtn}
                  style={{ 
                    padding: "10px", 
                    margin: "5px", 
                    border: "1px solid black",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    if (activeEmp === emp.id) {
                        setActiveEmp(null);
                        setEmpDetails(null);
                        setShowEmployeeDetailsMenu(false);
                      } else {
                        setActiveEmp(emp.id);
                        setEmpDetails(null); 
                        fetchEmpData(emp.id);
                      }
                      }}
                >
                   {emp.name}<br/>
                      ID: {emp.id}<br/>
                      {/* Job Title: {emp.job} */}
                </button>
                {/* details */}
                   {showEmployeeDetailsMenu && empDetails && activeEmp === emp.id && (
                      <div 
                        className={styles.submenu} 
                        style={{ 
                          minWidth:"220px",
                          padding:"10px",
                          background: "white",
                          border:"1px solid black",
                          position:"absolute",
                          zIndex:100
                        }}
                      >
                        <p>Name: {empDetails.name}</p>
                        <p>Employee ID: {empDetails.id}</p>
                        <p>Job Title: {empDetails.job_title}</p>
                        <p>Office Name: {empDetails.building_name}</p>
                        {/* <p>Salary: {empDetails.salary}</p> */}
                        <p>DOB: {empDetails.dob}</p>
                        {/* <p>NIN: {empDetails.nin}</p> */}
                        <p>Email: {empDetails.email}</p>
                        <p>Contract Type: {empDetails.contract_type}</p>
                        <p>Date Joined: {empDetails.date_joined}</p>
                        <p>Department Name: {empDetails.department_name}</p>
                      </div>
                    )}

                  </div>
          ))}
        </div>
    </div>

    <Sidebar />

    
  </div>
);
}


                    {/* employees in dept */}
                    {/* {showEmployeeMenu && activeDept === dept.id && (
                      <div className={styles.submenu}>
                        {empDept.map(emp => (
                          // emp details
                          <div
                           key={emp.id}
                           className={styles.subnavItem}
                          onMouseEnter={() => {
                            setActiveEmp(emp.id);
                            setEmpDetails(null);
                            fetchEmpData(emp.id);
                            setShowEmployeeDetailsMenu(true)}}
                          onMouseLeave={() => {
                            {}
                          }}>
                           {emp.name}

                         
                          </div>
                        ))}
                      </div> */} 
                    {/* )} */}